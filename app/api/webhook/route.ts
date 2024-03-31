import { NextResponse } from "next/server";
const EasyPost = require("@easypost/api");

export async function POST(req: Request) {
  try {
    const data = await req.json();

    return NextResponse.json({});
  } catch (error: any) {
    console.log("RATES:", error);
    return new NextResponse("Error getting rates", { status: 500 });
  }
}
