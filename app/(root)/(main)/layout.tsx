import { createStripeCustomer } from "@/actions/stripe";
import { PropsWithChildren } from "react";

export default async function Layout({ children }: PropsWithChildren) {
  await createStripeCustomer();

  return (
    <>
      {children}
    </>
  )
}