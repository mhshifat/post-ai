import { createConnection, getConnectionByType } from "@/actions/connections";
import { googleOAuthClient } from "@/lib/google";
import { IConnectionType } from "@/utils/types";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const code = new URL(req.url).searchParams.get("code");
    const state = new URL(req.url).searchParams.get("state");
    if (!code || !state) throw new Error("Invalid request");
    const { userId } = JSON.parse(state || "{}");
    const { tokens } = await googleOAuthClient.getToken(code);
    const connection = await getConnectionByType(IConnectionType.GOOGLE_MEET);
    if (!connection) {
      await createConnection({
        accountId: "",
        metadata: JSON.stringify(tokens),
        type: IConnectionType.GOOGLE_MEET,
        userId
      });
    }
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_SITE_URL}/integrations`);
  } catch (err) {
    console.error(err);
    return new NextResponse("Internal server error", { status: 500 });
  }
}