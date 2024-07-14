"use server";

import { db } from "@/db/drizzle";
import { users } from "@/db/schema";
import { stripeClient } from "@/lib/stripe";
import { currentUser } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { unstable_noStore } from "next/cache";
import { redirect } from "next/navigation";

export async function upsertStripeCustomer(args: {
  email: string;
}) {
  const { data } = await stripeClient.customers.list({
    email: args.email,
    limit: 1
  });
  let customer = data[0];
  if (!customer) customer = await stripeClient.customers.create({
    email: args.email,
  });
  return customer;
}

export async function upsertStripeProduct(args: {
  name: string;
}) {
  const { data } = await stripeClient.products.search({
    query: `name:"${args.name}"`
  });
  let product = data[0];
  if (!product) product = await stripeClient.products.create({
    name: args.name,
  })
  return product;
}

export async function ongoingStripeSubscription(args: {
  customer: string;
  product?: {
    name: string;
    price: number
  },
  metadata?: Record<string, string>
}) {
  const { data } = await stripeClient.subscriptions.list({
    customer: args.customer
  });
  const subscription = data[0];
  if (!subscription && args.product) {
    const product = await upsertStripeProduct({
      name: args.product.name
    });
    if (!product) throw new Error("Product not found");
    const { url } = await stripeClient.checkout.sessions.create({
      customer: args.customer,
      metadata: {
        ...args.metadata
      },
      line_items: [
        {
          price_data: {
            product: product.id,
            unit_amount: args.product.price,
            currency: "usd",
            recurring: {
              interval: "month"
            } 
          },
          quantity: 1,
        }
      ],
      payment_method_types: ["card"],
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/settings`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/settings`,
      mode: "subscription",
    });
    return redirect(url as string);
  }
  return subscription;
}

export async function userOngoingSubscription() {
  unstable_noStore();

  const clerk = await currentUser();
  if (!clerk) throw new Error("Unauthenticated");
  const [user] = await db
    .select({
      id: users.id,
      email: users.email,
    })
    .from(users)
    .where(
      eq(users.clerkId, clerk.id)
    );
  const customer = await upsertStripeCustomer({
    email: user.email
  });
  if (!customer) throw new Error("Customer not found!");
  const subscription = await ongoingStripeSubscription({
    customer: customer.id
  });
  if (!subscription) return null;
  const product = await stripeClient.products.retrieve((subscription as unknown as { plan: { product: string } }).plan.product)
  return {
    plan: product.name
  };
}

export async function createCustomerSubscription(plan: {
  name: string;
  price: number;
}) {
  const clerk = await currentUser();
  if (!clerk) throw new Error("Unauthenticated");
  const [user] = await db
    .select({
      id: users.id,
      email: users.email,
    })
    .from(users)
    .where(
      eq(users.clerkId, clerk.id)
    );
  const customer = await upsertStripeCustomer({
    email: user.email
  });
  if (!customer) throw new Error("Customer not found!");
  await ongoingStripeSubscription({
    customer: customer.id,
    product: {
      name: plan.name,
      price: plan.price * 100
    },
    metadata: {
      userId: user.id,
      customerId: customer.id,
    }
  });
  return redirect("/settings");
}

export async function cancelOngoingSubscription() {
  const clerk = await currentUser();
  if (!clerk) throw new Error("Unauthenticated");
  const [user] = await db
    .select({
      id: users.id,
      email: users.email,
    })
    .from(users)
    .where(
      eq(users.clerkId, clerk.id)
    );
  const customer = await upsertStripeCustomer({
    email: user.email
  });
  if (!customer) throw new Error("Customer not found!");
  const subscription = await ongoingStripeSubscription({
    customer: customer.id
  });
  await stripeClient.subscriptions.cancel(subscription.id);
}