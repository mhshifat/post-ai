import { PropsWithChildren } from "react";
import DialogProvider from "./dialog-provider";
import SubscriptionProvider from "./subscription-provider";
import { currentSubscriptions } from "@/actions/stripe";
import { IPlans } from "@/utils/types";

export default async function Providers({ children }: PropsWithChildren) {
  const { subscriptions } = await currentSubscriptions();

  return (
    <SubscriptionProvider
      currentPlan={(subscriptions?.[0]?.plan?.nickname as IPlans) || undefined}
    >
      <DialogProvider>
        {children}
      </DialogProvider>
    </SubscriptionProvider>
  )
}