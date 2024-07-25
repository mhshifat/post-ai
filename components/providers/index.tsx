import { PropsWithChildren } from "react";
import DialogProvider from "./dialog-provider";
import SubscriptionProvider from "./subscription-provider";
import { currentSubscriptions } from "@/actions/stripe";
import { IPlans } from "@/utils/types";
import ConfigProvider from "./config-provider";

export default async function Providers({ children }: PropsWithChildren) {
  const { subscriptions } = await currentSubscriptions();
  const envs = {
    TEST_MODE: process.env.TEST_MODE === "true"
  }

  return (
    <ConfigProvider
      envs={envs}
    >
      <SubscriptionProvider
        currentPlan={(subscriptions?.[0]?.plan?.nickname as IPlans) || undefined}
      >
        <DialogProvider>
          {children}
        </DialogProvider>
      </SubscriptionProvider>
    </ConfigProvider>
  )
}