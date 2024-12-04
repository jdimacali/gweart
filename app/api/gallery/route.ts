import { API_URL } from "@/lib/utils";
import axios from "axios";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    // Make the API call to get information about the events
    const response = await axios.get(
      `${API_URL}/api/gallery?populate[Artwork][populate]=*`
    );
    return NextResponse.json(response.data.data, {
      status: 200,
    });
  } catch (error) {
    console.error("Gallery Error:", error);
    return new NextResponse("Error fetching gallery data", { status: 500 });
  }
}
