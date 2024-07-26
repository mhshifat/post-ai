import { NextResponse } from "next/server";

export async function GET() {
  try {
    return NextResponse.json({});
  } catch (err) {
    console.error(err);
    return new NextResponse("Internal server error", { status: 500 });
  }
}