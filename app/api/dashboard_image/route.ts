import { API_URL } from "@/lib/utils";
import axios from "axios";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = await axios.get(`${API_URL}api/linktree`);
    return NextResponse.json(response.data);
  } catch (error: any) {
    console.error("Dashboard_Image", error);
    return new NextResponse("Dashboard_Image", { status: 500 });
  }
}
