import { getProductPurchasePaymentIntentSecret } from "@/actions/stripe";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const data = await getProductPurchasePaymentIntentSecret(body);

    return NextResponse.json(data);
  } catch (err) {
    console.error(err);
    return new NextResponse("Internal server error", { status: 500 });
  }
}