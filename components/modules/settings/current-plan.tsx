"use client";

import { useDialog } from "@/components/providers/dialog-provider";
import { Button } from "@/components/ui/button";
import SelectPlan from "./select-plan";
import Image from "next/image";
import { plans } from "@/utils/constants";
import Badge from "@/components/ui/badge";
import { CheckIcon } from "lucide-react";
import { useSubscription } from "@/components/providers/subscription-provider";
import Confirmation from "@/components/shared/confirmation";
import { useRouter } from "next/navigation";
import { cancelOngoingSubscription } from "@/actions/stripe";

export default function CurrentPlan() {
  const router = useRouter();
  const { openDialog, closeDialog } = useDialog();
  const { currentPlan } = useSubscription();
  const planDetails = plans.find(plan => plan.title === currentPlan);

  async function handleCancelSubscription() {
    await cancelOngoingSubscription();
    closeDialog();
    router.refresh();
  }
  return (
    <div className="w-full">
      {!currentPlan && (
        <div className="flex items-center gap-5 justify-center flex-col py-2 px-3 aspect-[3/1] text-center">
          <p className="max-w-[82%] text-sm font-semibold text-slate-500">You do not have any active subscription, to purchase a subscription please click on the button that says "Purchase Plan" below.</p>
        </div>
      )}
      {currentPlan && <div className="flex gap-10">
        <div className="relative flex-1 rounded-lg overflow-hidden">
          <Image fill className="object-cover" src="https://images.ui8.net/uploads/presentation_1612381616989.png" alt="" />
        </div>

        <div className="flex-1">
          <h3 className="text-xl uppercase font-semibold flex gap-2">
            {planDetails?.title}
            <Badge>{planDetails?.price === 0 ? "FREE" : `$${planDetails?.price}`}</Badge>
          </h3>
          <ul className="flex flex-col gap-1 mt-5">
            {planDetails?.benefits.map((item, idx) => (
              <li key={item + idx} className="flex items-start gap-2 text-sm text-slate-500"><CheckIcon className="mt-1 shrink-0 size-4 text-slate-500" /> {item}</li>
            ))}
          </ul>
        </div>
      </div>}
      <div className="flex items-center gap-5">
        {(planDetails?.price || 0) > 0 && <Button onClick={() => openDialog({
          title: "Cancel Plan",
          description: "Are you sure you want to cancel the subscription?. You will not get refund if you do so",
          content: <Confirmation
            onCancel={closeDialog}
            onOk={handleCancelSubscription}
          />
        })} variant="destructive" className="w-full mt-5">Cancel plan</Button>}
        <Button className="w-full mt-5" onClick={() => openDialog({
          title: "Select Plan",
          description: "Please select a plan",
          content: <SelectPlan />
        })}>{currentPlan ? "Upgrade plan" : "Purchase Plan"}</Button>
      </div>
    </div>
  )
}