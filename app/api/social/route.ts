import { NextResponse } from "next/server";

export async function GET() {
  try {
    const accessToken = process.env.NEXT_PUBLIC_INSTAGRAM_ACCESS_TOKEN;

    if (!accessToken) {
      throw new Error("Instagram access token not found");
    }

    // First fetch user profile info
    const profileResponse = await fetch(
      `https://graph.instagram.com/me?fields=username,account_type,media_count,profile_picture_url&access_token=${accessToken}`
    );

    if (!profileResponse.ok) {
      throw new Error("Failed to fetch Instagram profile");
    }

    const profileData = await profileResponse.json();

    // Then fetch media
    const mediaResponse = await fetch(
      `https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url,permalink,thumbnail_url,timestamp,username,children{media_url,media_type,thumbnail_url}&limit=4&access_token=${accessToken}`
    );

    if (!mediaResponse.ok) {
      throw new Error("Failed to fetch Instagram posts");
    }

    const mediaData = await mediaResponse.json();

    return NextResponse.json({
      profile: {
        ...profileData,
        display_name: "Girl Wonder Extraordinaire" // Hardcoded since Instagram API doesn't provide this
      },
      posts: mediaData.data
    });
  } catch (error) {
    console.error("Instagram fetch error:", error);
    return NextResponse.json(
      { error: "Failed to fetch Instagram data" },
      { status: 500 }
    );
  }
}
