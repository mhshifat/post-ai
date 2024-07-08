import { db } from "@/db/drizzle";
import { connections, users } from "@/db/schema";
import { stripeClient } from "@/lib/sttripe";
import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { v4 } from 'uuid';

export async function GET() {
  try {
    const user = await currentUser();
    if (!user) return new NextResponse("Unauthenticated", { status: 401 });
    const [userDetails] = await db
      .select({
        id: users.id,
        email: users.email,
      })
      .from(users);
    if (!userDetails) return new NextResponse("User not found", { status: 404 });
    const [connectionDetails] = await db
      .select({
        id: connections.id,
        metadata: connections.metadata,
      })
      .from(connections);
    let { accountId } = JSON.parse(connectionDetails?.metadata || "{}") || {};
    if (!accountId) {
      const { id } = await stripeClient.accounts.create({
        type: "custom",
        country: "CA",
        business_type: "company",
        capabilities: {
          card_payments: {
            requested: true
          },
          transfers: {
            requested: true
          }
        },
        email: userDetails.email
      });
      await db
        .insert(connections)
        .values({
          id: v4(),
          metadata: JSON.stringify({
            accountId: id
          }),
          type: "stripe",
          userId: userDetails.id,
          createdAt: new Date()
        })
        .returning({ id: connections.id })
        .execute();
      accountId = id;
    }
    const { url } = await stripeClient.accountLinks.create({
      account: accountId,
      type: "account_onboarding",
      refresh_url: `${process.env.NEXT_PUBLIC_SITE_URL}/integrations/success?connection=stripe`,
      return_url: `${process.env.NEXT_PUBLIC_SITE_URL}/integrations`,
      collection_options: {
        fields: "currently_due"
      }
    });

    return NextResponse.json({ url });
  } catch (err) {
    console.error(err);
    return new NextResponse("Internal server error", { status: 500 });
  }
}