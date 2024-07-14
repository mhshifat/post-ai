"use client";

import { createCustomerSubscription } from "@/actions/stripe";
import { Button } from "@/components/ui/button";

interface GetStartedPlanBtnProps {
  name: string;
  price: number;
}

export default function GetStartedPlanBtn(props: GetStartedPlanBtnProps) {
  async function handleClick() {
    await createCustomerSubscription(props)
  }
  return (
    <Button onClick={handleClick} className="w-full mt-10 flex items-center justify-center text-base font-semibold border border-[#007DFC]/50 py-2 px-3 text-slate-900 rounded-md bg-[#007DFC]/10 hover:text-white">Get Started</Button>
  )
}