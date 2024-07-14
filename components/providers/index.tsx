import { PropsWithChildren } from "react";
import DialogProvider from "./dialog-provider";
import SubscriptionProvider from "./subscription-provider";
import { userOngoingSubscription } from "@/actions/stripe";
import { IPlans } from "@/utils/types";

export default async function Providers({ children }: PropsWithChildren) {
  const currentPlan = await userOngoingSubscription();

  return (
    <SubscriptionProvider
      currentPlan={!currentPlan ? "STANDARD" : currentPlan?.plan as IPlans}
    >
      <DialogProvider>
        {children}
      </DialogProvider>
    </SubscriptionProvider>
  )
}