"use client";

import { IPlans } from "@/utils/types";
import { PropsWithChildren, ReactElement } from "react";
import { useSubscription } from "../providers/subscription-provider";

interface CanAccessProps {
  subscriptions: IPlans[];
  fallback: ReactElement;
}

export default function CanAccess({ children, subscriptions, fallback }: PropsWithChildren<CanAccessProps>) {
  let hasAccess = false;
  const { currentPlan } = useSubscription();
  if (subscriptions.length && currentPlan) hasAccess = subscriptions[0] === currentPlan;

  if (!hasAccess) return fallback;
  return (
    <>
      {children}
    </>
  )
}