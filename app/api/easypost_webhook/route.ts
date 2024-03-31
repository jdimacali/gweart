import { NextResponse } from "next/server";
const EasyPost = require("@easypost/api");
import { EmailTemplate } from "@/components/emailTemplate";
import { Resend } from "resend";

const resend = new Resend(process.env.NEXT_PUBLIC_RESEND);

export async function POST(req: Request) {
  try {
    const data = await req.json();

    if (data.object === "Event" && data.description === "tracker.updated") {
      const event = await EasyPost.Event.receive(req.body);
      const tracker = event.result;

      let message = "Hey, this is GWEart. ";

      if (tracker.status === "delivered") {
        message += "Your package has arrived!";
      } else {
        const td = tracker.tracking_details
          .reverse()
          .find(
            (trackingDetail: any) => trackingDetail.status === tracker.status
          );
        message += `There's an update on your package: ${tracker.carrier} says: ${td.message} in ${td.tracking_location.city}.`;
      }

      const data = await resend.emails.send({
        from: "Acme <onboarding@resend.dev>",
        to: ["frostbitezebra421@gmail.com"],
        subject: "Hello world",
        react: EmailTemplate({ firstName: "James" }),
        text: "Hello world",
      });

      return new NextResponse("Email update was sent to the customer!", {
        status: 200,
      });
    } else {
      return new NextResponse(
        "Not a Tracker event, so nothing to do here for now...",
        { status: 200 }
      );
    }
  } catch (error: any) {
    console.log("RATES:", error);
    return new NextResponse("Error getting easypost webhook", { status: 500 });
  }
}
