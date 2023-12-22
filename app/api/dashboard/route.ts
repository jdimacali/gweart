import { API_URL } from "@/lib/utils";
import axios from "axios";
import { NextResponse } from "next/server";

interface ImageFormat {
  ext: string;
  mime: string;
  url: string;
}

interface ImageData {
  attributes: {
    name: string;
    formats: {
      large: ImageFormat;
    };
  };
}

interface DashboardResponse {
  data: {
    attributes: {
      Title: string;
      Subtitle: string;
      Button: string;
      Images: {
        data: ImageData[];
      };
    };
  };
}

export const dynamic = "force-dynamic";

// Define the Next.js API route handler
export async function GET() {
  try {
    // Make the API call to get information about the images
    const response = await axios.get(`${API_URL}/api/dashboard?populate=*`);

    // Extract relevant data from the API response
    const { Title, Subtitle, Images, Button } = response.data.data.attributes;

    // Extract image URLs into an array
    const imageUrls: string[] = Images.data.map((image: ImageData) => {
      const imageUrl: string = `${image.attributes.formats.large.url}`;
      return imageUrl;
    });

    const responseData = {
      title: Title,
      subtitle: Subtitle,
      button: Button,
      imageUrls,
    };

    // Return the image data as a JSON response
    return NextResponse.json(responseData, { status: 200 });
  } catch (error: any) {
    console.error("Dashboard", error);
    return new NextResponse("Error fetching image data", { status: 500 });
  }
}
