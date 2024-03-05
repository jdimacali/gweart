import { API_URL } from "@/lib/utils";
import axios from "axios";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

// Define the Next.js API route handler
export async function POST(req: Request) {
  const { items } = await req.json();
  
  try {
    const response = await axios.post(`${API_URL}/api/orders`, items);

    return NextResponse.json(response.data, { status: 200 });
  } catch (error: any) {
    console.error("Orders", error);
    return new NextResponse("Error fetching orders data", { status: 500 });
  }
}
