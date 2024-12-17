import { refreshInstagramToken } from "@/lib/instagramToken";
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const result = await refreshInstagramToken();
    return NextResponse.json({ 
      success: true, 
      message: 'Token refreshed successfully',
      expiresIn: result.expires_in 
    });
  } catch (error) {
    console.error('Token refresh failed:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to refresh token' },
      { status: 500 }
    );
  }
} 