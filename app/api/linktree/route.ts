import { API_URL } from "@/lib/utils";
import axios from "axios";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = await axios.get(`${API_URL}/api/beacon?populate=*`);
    return NextResponse.json(response.data.data);
  } catch (error: any) {
    console.error("Linktree", error);
    return new NextResponse("Linktree", { status: 500 });
  }
}
