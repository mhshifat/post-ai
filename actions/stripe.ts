"use server";

import { db } from "@/db/drizzle";
import { stripeClient } from "@/lib/stripe";
import { IStripeSubScriptionWithPlan } from "@/utils/types";
import { clerkClient, currentUser } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { unstable_noStore } from "next/cache";
import { redirect } from "next/navigation";
import Stripe from "stripe";

// TODO: uncomment
export async function upsertStripeSubscriptionProducts(plans: {
  name: string;
  price: number;
}[]) {
  // const { data: products } = await stripeClient.products.list({
  //   expand: ["data.default_price"],
  //   type: "service"
  // });
  // const availablePlansToBeInsert = plans.filter(plan => !products.some(pro => pro.name === plan.name));
  // await Promise.allSettled(
  //   availablePlansToBeInsert.map(async plan => {
  //     const product = await stripeClient.products.create({
  //       name: plan.name,
  //       metadata: plan,
  //     })
  //     const price = await stripeClient.prices.create({
  //       product: product.id,
  //       currency: "usd",
  //       unit_amount: plan.price * 100,
  //       metadata: plan,
  //       nickname: plan.name,
  //       recurring: {
  //         interval: "month"
  //       },
  //     });
  //     await stripeClient.products.update(product.id, {
  //       metadata: {
  //         price_id: price.id
  //       },
  //     });
  //     return {
  //       ...product,
  //       price
  //     }
  //   })
  // );
  
  // return products;
  return [];
}

export async function createStripeCustomer() {
  // const user = await currentUser();
  // if (!user) return null;
  
  // const email = user.emailAddresses?.[0]?.emailAddress;

  // const { data: customers } = await stripeClient.customers.list({
  //   email
  // });
  // let customer = customers[0];
  // if (!customer) {
  //   customer = await stripeClient.customers.create({
  //     email,
  //     metadata: {
  //       ...user.privateMetadata,
  //       clerk_id: user.id,
  //     },
  //     name: `${user.firstName} ${user.lastName}`,
  //   });
  //   await clerkClient.users.updateUser(user.id, {
  //     privateMetadata: {
  //       ...user.privateMetadata,
  //       customer_id: customer.id
  //     }
  //   })
  // }
  
  // return customer;
  return {}
}

export async function currentSubscriptions() {
  // const user = await currentUser();
  // if (!user) return {
  //   subscriptions: [],
  //   customerId: null,
  //   user: null
  // };
  // let customerId = user?.privateMetadata?.customer_id as string;
  // if (!customerId) {
  //   const { id } = await createStripeCustomer() || {};
  //   if (id) customerId = id;
  // }
  // const { data: subscriptions } = await stripeClient.subscriptions.list({
  //   customer: customerId,
  // })

  // const activeSubscriptions = subscriptions.filter(sub => sub.status === 'active');
  
  // return {
  //   subscriptions: activeSubscriptions as IStripeSubScriptionWithPlan[],
  //   customerId,
  //   user
  // };
  return {}
}

export async function stripeCheckoutPurchaseSubscription(args: {
  name: string;
  price: number;
}) {
  // const { subscriptions, customerId } = await currentSubscriptions();
  // if (!customerId) return redirect("/settings");
  // const isSame = subscriptions.find(sub => sub.plan.nickname === args.name);
  // if (isSame || (!isSame && subscriptions.length > 0)) return redirect("/settings");
  // const { data: products } = await stripeClient.products.list({
  //   type: "service"
  // });
  // const product = products.find(p => p.name === args.name);
  // const { url } = await stripeClient.checkout.sessions.create({
  //   mode: "subscription",
  //   customer: customerId,
  //   line_items: [
  //     {
  //       quantity: 1,
  //       price: product?.metadata?.price_id,
  //     }
  //   ],
  //   success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/settings`,
  //   cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/settings`,
  // });

  // return redirect(url as string);
}

export async function cancelOngoingSubscription() {
  // const { subscriptions } = await currentSubscriptions();
  // await Promise.allSettled(subscriptions.map(sub => stripeClient.subscriptions.cancel(sub.id)));
}

export async function getPurchaseOrUpgradeSubscriptionPaymentIntentSecret(args: {
  name: string;
  price: number;
}) {
  // try {
  //   const { subscriptions, customerId } = await currentSubscriptions();
  //   if (!customerId) return {
  //     secret: ""
  //   };
  //   const isSame = subscriptions.find(sub => sub.plan.nickname === args.name);
  //   if (isSame) throw new Error("Already subscribed to this plan");
  //   const { data: products } = await stripeClient.products.list({
  //     type: "service"
  //   });
  //   const product = products.find(p => p.name === args.name);
  //   const subPayload: Stripe.SubscriptionCreateParams = {
  //     customer: customerId,
  //     payment_behavior: "default_incomplete",
  //     expand: ['latest_invoice.payment_intent'],
  //     items: [
  //       {
  //         price: product?.metadata?.price_id,
  //         quantity: 1,
  //       }
  //     ],
  //   }
  //   if (!subscriptions.length) {
  //     const subscription = await stripeClient.subscriptions.create(subPayload)
      
  //     return {
  //       secret: (subscription?.latest_invoice as { payment_intent: { client_secret: string } }).payment_intent?.client_secret
  //     }
  //   }
    
  //   await stripeClient.subscriptions.cancel(subscriptions[0].id);
  //   const subscription = await stripeClient.subscriptions.create(subPayload);

  //   return { secret: (subscription?.latest_invoice as { payment_intent: { client_secret: string } }).payment_intent?.client_secret }
  // } catch (err) {
  //   if (err instanceof Error) {
  //     return {
  //       secret: "",
  //       message: err?.message
  //     }
  //   }
  //   return { secret: "" }
  // }
}