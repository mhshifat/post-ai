"use client";

import Divider from "@/components/ui/divider"
import Image from "next/image";
import StripePaymentForm from "./stripe-payment-form";
import ClientOnly from "@/components/ui/client-only";
import useProduct from "@/components/hooks/use-product";
import NotFound from "@/components/shared/not-found";
import useConnection from "@/components/hooks/use-connection";
import { IConnectionType } from "@/utils/types";

export default function PaymentForm({ domainId, customerId }: { domainId: string; customerId: string }) {
  const { getConnection } = useConnection({
    domainId
  });
  const connection = getConnection(IConnectionType.STRIPE);
  const { products, totalProductPrice } = useProduct({
    domainId
  });

  if (!products.length) return (
    <NotFound />
  )
  return (
    <div className="flex items-start gap-3">
      <div className="flex-1">
        <div className="flex flex-col gap-3">
          {products.map(pro => (
            <div key={pro.id} className="border border-border py-2 px-3 rounded-lg flex items-center gap-2">
              <Image src={pro?.image || "https://picsum.photos/200"} width={30} height={30} className="rounded-md" alt="" />
              <h3 className="text-sm font-medium text-foreground/50">{pro.title}</h3>
              <strong className="text-base font-medium text-foreground ml-auto">${pro.price}</strong>
            </div>
          ))}

          <div className="mt-5">
            <p className="text-right m-0 text-sm font-medium text-foreground/50">Total: <strong className="text-base font-medium text-foreground ml-auto">${totalProductPrice}</strong></p>
          </div>
        </div>
      </div>
      <Divider orientation="vertical" />
      <div className="flex-1">
        <ClientOnly>
          {connection?.accountId && (
            <StripePaymentForm
              amount={totalProductPrice || 0}
              product={products?.map(pro => pro.title).join(",")}
              paymentIntentUrl="/api/stripe/product-payment-intent"
              mode="payment"
              state={{
                domainId,
                customerId
              }}
              stripeAccountId={connection.accountId}
            />
          )}
        </ClientOnly>
      </div>
    </div>
  )
}