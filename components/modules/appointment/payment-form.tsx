"use client";

import Divider from "@/components/ui/divider"
import Image from "next/image";
import StripePaymentForm from "./stripe-payment-form";

export default function PaymentForm() {
  return (
    <div className="flex items-start gap-3">
      <div className="flex-1">
        <div className="flex flex-col gap-5">
          <div className="border border-slate-300 py-2 px-3 rounded-lg flex items-center gap-2">
            <Image src="https://picsum.photos/200" width={30} height={30} className="rounded-md" alt="" />
            <h3 className="text-sm font-medium text-foreground/50">Product 1</h3>
            <strong className="text-base font-medium text-slate-900 ml-auto">$30</strong>
          </div>

          <div>
            <p className="text-right m-0 text-sm font-medium text-foreground/50">Total: <strong className="text-base font-medium text-slate-900 ml-auto">$30</strong></p>
          </div>
        </div>
      </div>
      <Divider orientation="vertical" />
      <div className="flex-1">
        <StripePaymentForm
          amount={0}
          product={""}
          paymentIntentUrl="/api/stripe/subscription-payment-intent"
          mode="subscription"
        />
      </div>
    </div>
  )
}