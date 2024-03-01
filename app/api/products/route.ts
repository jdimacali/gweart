import { API_URL } from "@/lib/utils";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

// Define the Next.js API route handler
export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const categoryId = searchParams.get("categoryId");
  const name = searchParams.get("name");
  const page = searchParams.get("page");

  if (categoryId) {
    try {
      // Make the API call to get information about the events
      const response = await axios.get(
        `${API_URL}/api/products?pagination[page]=${
          page ? page : 1
        }&pagination[pageSize]=9&populate[image][fields][0]=url&populate[categories][fields][0]=id&populate[categories][fields][1]=name&filters[categories][id][$eq]=${categoryId}`
      );

      // Return the image data as a JSON response
      return NextResponse.json(
        {
          response: response.data.data,
          metadata: response.data.meta.pagination,
        },
        { status: 200 }
      );
    } catch (error: any) {
      console.error("Products", error);
      return new NextResponse("Error fetching image data", { status: 500 });
    }
  } else {
    try {
      // Make the API call to get information about the events
      const response = await axios.get(
        `${API_URL}/api/products?pagination[page]=${
          page ? page : 1
        }&pagination[pageSize]=9&populate=*`
      );
      // Return the image data as a JSON response
      return NextResponse.json(
        {
          response: response.data.data,
          metadata: response.data.meta.pagination,
        },
        { status: 200 }
      );
    } catch (error: any) {
      console.error("Products", error);
      return new NextResponse("Error fetching image data", { status: 500 });
    }
  }
}
