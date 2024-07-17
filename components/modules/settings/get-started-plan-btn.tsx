"use client";

import { stripeCheckoutPurchaseSubscription } from "@/actions/stripe";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import Spinner from '@/components/shared/spinner';

interface GetStartedPlanBtnProps {
  name: string;
  price: number;
}

export default function GetStartedPlanBtn(props: GetStartedPlanBtnProps) {
  const [loading, setLoading] = useState(false);

  async function handleClick() {
    setLoading(true);
    await stripeCheckoutPurchaseSubscription(props);
  }
  
  return (
    <Button onClick={handleClick} className="w-full mt-10 flex items-center justify-center text-base font-semibold border border-primary/50 py-2 px-3 text-foreground rounded-md bg-primary/10 hover:text-primary-foreground">{loading ? <Spinner /> : "Get Started"}</Button>
  )
}