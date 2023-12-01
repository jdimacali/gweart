import { API_URL } from "@/lib/utils";
import axios from "axios";
import { NextResponse } from "next/server";

// Define the Next.js API route handler
export async function GET() {
  try {
    // Make the API call to get information about the images
    const response = await axios.get(`${API_URL}api/events?populate=image`);

    // Extract relevant data from the API response
    const { Images } = response.data.data.attributes;

    // Extract image URLs into an array
    const imageUrls: string[] = Images.data.map((image: ImageData) => {
      const imageUrl: string = `${API_URL}${image.attributes.formats.large.url}`;
      return imageUrl;
    });

    const responseData = {
      imageUrls,
    };

    // Return the image data as a JSON response
    return NextResponse.json(responseData, { status: 200 });
  } catch (error: any) {
    console.error("Dashboard", error);
    return new NextResponse("Error fetching image data", { status: 500 });
  }
}
