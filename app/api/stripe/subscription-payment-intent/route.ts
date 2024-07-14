import { createSubscriptionPaymentIntent } from "@/actions/stripe";
import { currentUser } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const user = await currentUser();
    if (!user) return new NextResponse("Unauthenticated", { status: 401 });
    const body = await req.json();
    const secret = await createSubscriptionPaymentIntent({
      product: body
    })

    return NextResponse.json({ secret });
  } catch (err) {
    console.error(err);
    return new NextResponse("Internal server error", { status: 500 });
  }
}