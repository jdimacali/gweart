import { NextResponse } from "next/server";

const INSTAGRAM_API_URL = "https://graph.instagram.com/me/media";
const INSTAGRAM_FIELDS =
  "id,username,media_type,media_url,permalink,thumbnail_url,caption,timestamp";

export async function GET() {
  // Validate access token
  const accessToken = process.env.NEXT_PUBLIC_INSTAGRAM_ACCESS_TOKEN;
  if (!accessToken) {
    return NextResponse.json(
      { error: "Instagram access token not configured" },
      { status: 500 }
    );
  }

  try {
    // Fetch user's media from Instagram Graph API
    const response = await fetch(
      `${INSTAGRAM_API_URL}?fields=${INSTAGRAM_FIELDS}&access_token=${accessToken}`,
      {
        next: { revalidate: 3600 }, // Cache for 1 hour
      }
    );

    if (!response.ok) {
      const errorBody = await response.json();
      throw new Error(
        `Instagram API error: ${
          errorBody.error?.message || response.statusText
        }`
      );
    }

    const data = await response.json();

    // Transform the data to match our needs
    const transformedData = {
      posts: data.data.map((post: any) => ({
        id: post.id,
        caption: post.caption,
        mediaType: post.media_type,
        mediaUrl: post.media_url,
        permalink: post.permalink,
        thumbnailUrl: post.thumbnail_url,
        timestamp: post.timestamp,
      })),
      pagination: data.paging,
    };

    return NextResponse.json(transformedData);
  } catch (error: any) {
    console.error("Instagram API Error:", error.message);
    return NextResponse.json(
      { error: "Failed to fetch Instagram data" },
      { status: 500 }
    );
  }
}
