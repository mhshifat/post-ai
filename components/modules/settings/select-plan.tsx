import Checkbox from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { IPlans } from "@/utils/types";
import { ReactNode, useState } from "react";
import StripePaymentForm from "../appointment/stripe-payment-form";
import { plans } from "@/utils/constants";
import { useSubscription } from "@/components/providers/subscription-provider";

export default function SelectPlan() {
  const { currentPlan } = useSubscription();
  const [selectedPlan, setSelectedPlan] = useState<IPlans | null>();

  const ongoingPlan = plans.find(p => p.title === currentPlan);
  const plan = plans.find(p => p.title === selectedPlan);
  return (
    <div>
      <Checkbox
        type="radio"
        className="flex flex-col gap-5"
        renderItem={({ title, metadata, isChecked }) => (
          <div className={cn("relative py-2 px-3 border border-border rounded-sm shadow-inner flex items-center gap-5", {
            "border-primary": isChecked
          })}>
            {isChecked && <span className="absolute top-3 right-3 w-2 h-2 rounded-full bg-primary" />}

            <span className={cn("h-full flex justify-center items-center p-3 text-2xl font-semibold text-foreground", {
              "border-primary": isChecked
            })}>
              ${(metadata?.price || "0") as ReactNode}
            </span>

            <span className="flex flex-col justify-center">
              <h3 className="text-base font-semibold text-foreground">{title}</h3>
              {metadata && <p className="text-sm mt-1 text-foreground/50">{metadata?.description as ReactNode}</p>}
            </span>
          </div>
        )}
        onChange={({ checked, item }) => checked && setSelectedPlan(item as IPlans)}
      >
        {plans.map(plan => (
          <Checkbox.Item
            key={plan.id}
            disabled={ongoingPlan?.title === plan.title}
            title={plan.title}
            value={plan.title}
            metadata={{
              description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos, accusantium?",
              price: plan.price
            }}
          />
        ))}
      </Checkbox>

      {selectedPlan && (
        <div className="mt-10">
          <StripePaymentForm
            amount={plan?.price || 0}
            product={plan?.title || ""}
            paymentIntentUrl="/api/stripe/subscription-payment-intent"
            mode="subscription"
          />
        </div>
      )}
    </div>
  )
}