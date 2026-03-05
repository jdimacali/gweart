import { NextResponse } from "next/server";

export async function GET() {
  try {
    const accessToken = process.env.NEXT_PUBLIC_INSTAGRAM_ACCESS_TOKEN;

    if (!accessToken) {
      console.error("Instagram access token not found");
      return NextResponse.json(
        { error: "Instagram access token not configured" },
        { status: 401 }
      );
    }

    // First fetch user profile info
    const profileResponse = await fetch(
      `https://graph.instagram.com/me?fields=username,account_type,media_count,profile_picture_url&access_token=${accessToken}`
    );

    if (!profileResponse.ok) {
      const profileError = await profileResponse.text();
      console.error("Instagram profile fetch failed:", profileError);
      return NextResponse.json(
        { error: "Failed to fetch Instagram profile", details: profileError },
        { status: profileResponse.status }
      );
    }

    const profileData = await profileResponse.json();

    // Then fetch media
    const mediaResponse = await fetch(
      `https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url,permalink,thumbnail_url,timestamp,username,children{id,media_type,media_url,thumbnail_url,permalink}&limit=4&access_token=${accessToken}`
    );

    if (!mediaResponse.ok) {
      const mediaError = await mediaResponse.text();
      console.error("Instagram media fetch failed:", mediaError);
      return NextResponse.json(
        { error: "Failed to fetch Instagram posts", details: mediaError },
        { status: mediaResponse.status }
      );
    }

    const mediaData = await mediaResponse.json();

    return NextResponse.json({
      profile: {
        ...profileData,
        display_name: "Girl Wonder Extraordinaire",
      },
      posts: mediaData.data,
    });
  } catch (error) {
    console.error("Instagram API error:", error);
    return NextResponse.json(
      {
        error: "Failed to fetch Instagram data",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
