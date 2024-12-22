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
      `https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url,permalink,thumbnail_url,timestamp,username,children{id,media_type,media_url,thumbnail_url,permalink}&limit=4&access_token=${accessToken}`
    );

    if (!mediaResponse.ok) {
      throw new Error("Failed to fetch Instagram posts");
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
    return NextResponse.json(
      { error: "Failed to fetch Instagram data" },
      { status: 500 }
    );
  }
}
