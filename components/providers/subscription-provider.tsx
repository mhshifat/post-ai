"use client";

import { IPlans } from "@/utils/types";
import { createContext, PropsWithChildren, useContext } from "react"

interface SubscriptionProviderProps {
  currentPlan?: IPlans
}

interface SubscriptionCtxProps extends SubscriptionProviderProps {}

const SubscriptionCtx = createContext<SubscriptionCtxProps | null>(null);

export default function SubscriptionProvider({ children, currentPlan }: PropsWithChildren<SubscriptionProviderProps>) {
  return (
    <SubscriptionCtx.Provider value={{
      currentPlan
    }}>
      {children}
    </SubscriptionCtx.Provider>
  )
}

export function useSubscription() {
  const res = useContext(SubscriptionCtx);
  if (!res) throw new Error("Component needs to wrapped with SubscriptionProvider");
  return res;
}