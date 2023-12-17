import { API_URL } from "@/lib/utils";
import axios from "axios";
import { NextResponse } from "next/server";

// Define the Next.js API route handler
export async function GET() {
  try {
    // Make the API call to get information about the events
    const response = await axios.get(`${API_URL}/api/slides?populate=image`);

    // Return the image data as a JSON response
    return NextResponse.json(response.data.data, { status: 200 });
  } catch (error: any) {
    console.error("Slides", error);
    return new NextResponse("Error fetching image data", { status: 500 });
  }
}
