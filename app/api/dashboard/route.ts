import { API_URL } from "@/lib/utils";
import axios from "axios";
import { NextResponse } from "next/server";

// Define the types for image data
interface ImageFormat {
  name: string;
  hash: string;
  ext: string;
  mime: string;
  path: null;
  width: number;
  height: number;
  size: number;
  url: string;
}

interface ImageData {
  id: number;
  attributes: {
    name: string;
    alternativeText: null;
    caption: null;
    width: number;
    height: number;
    formats: {
      thumbnail: ImageFormat;
      small: ImageFormat;
      medium: ImageFormat;
      large: ImageFormat;
    };
    hash: string;
    ext: string;
    mime: string;
    size: number;
    url: string;
    previewUrl: null;
    provider: string;
    provider_metadata: null;
    createdAt: string;
    updatedAt: string;
  };
}

interface DashboardResponse {
  data: {
    attributes: {
      Title: string;
      Subtitle: string;
      Images: {
        data: ImageData[];
      };
      createdAt: string;
      updatedAt: string;
    };
    id: number;
  };
  meta: {};
}

// Define the Next.js API route handler
export async function GET() {
  try {
    // Make the API call to get information about the images
    const response = await axios.get(`${API_URL}/api/dashboard?populate=*`);

    // Extract relevant data from the API response
    const { Title, Subtitle, Images } = response.data.data.attributes;

    // Extract image URLs into an array
    const imageUrls: string[] = Images.data.map((image: ImageData) => {
      const imageUrl: string = `${API_URL}${image.attributes.formats.large.url}`;
      return imageUrl;
    });

    const responseData = {
      title: Title,
      subtitle: Subtitle,
      imageUrls,
    };

    // Return the image data as a JSON response
    return NextResponse.json(responseData, { status: 200 });
  } catch (error: any) {
    console.error("Dashboard", error);
    return new NextResponse("Error fetching image data", { status: 500 });
  }
}
