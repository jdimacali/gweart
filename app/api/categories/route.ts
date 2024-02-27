import { API_URL } from "@/lib/utils";
import axios from "axios";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

// Define the Next.js API route handler
export async function GET() {
  try {
    // Make the API call to get information about the events
    const response = await axios.get(`${API_URL}/api/Categories?populate=*`);

    // Return the image data as a JSON response
    return NextResponse.json(response.data.data, { status: 200 });
  } catch (error: any) {
    console.error("Dashboard", error);
    return new NextResponse("Error fetching image data", { status: 500 });
  }
}
