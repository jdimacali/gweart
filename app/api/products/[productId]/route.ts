import { API_URL } from "@/lib/utils";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

// Define the Next.js API route handler
export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const productId = searchParams.get("productId");
  try {
    // Make the API call to get information about product with a specific Id
    const response = await axios.get(
      `${API_URL}/api/products?populate[image][fields][0]=url&populate[categories][sort][0]=name%3Aasc&[filters][id][$in]=${productId}`,
      {
        params: {
          productId,
        },
      }
    );

    // Return the image data as a JSON response
    return NextResponse.json(response.data.data[0].attributes, { status: 200 });
  } catch (error: any) {
    console.error("Products", error);
    return new NextResponse("Error fetching image data", { status: 500 });
  }
}
