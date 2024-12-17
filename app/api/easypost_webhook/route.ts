import { NextResponse } from "next/server";
import { headers } from "next/headers";

export async function POST(req: Request) {
  try {
    const headersList = headers();
    const signature = headersList.get('X-Easypost-Signature');
    
    if (!signature) {
      return NextResponse.json(
        { error: "Missing signature" },
        { status: 401 }
      );
    }

    const body = await req.json();

    // Handle the webhook event
    const event = body;
    
    // Process the event based on its type
    switch (event.description) {
      case 'tracker.updated':
        // Handle tracker update
        await handleTrackerUpdate(event.result);
        break;
      // Add other cases as needed
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json(
      { error: "Webhook handler failed" },
      { status: 500 }
    );
  }
}

async function handleTrackerUpdate(tracker: any) {
  // Instead of using superagent, use fetch
  if (process.env.DISCORD_WEBHOOK_URL) {
    try {
      await fetch(process.env.DISCORD_WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: `📦 Tracking Update: ${tracker.tracking_code}\nStatus: ${tracker.status}\nUpdated: ${tracker.updated_at}`
        })
      });
    } catch (error) {
      console.error('Failed to send Discord notification:', error);
    }
  }
}
