import { NextResponse } from "next/server";
const EasyPost = require("@easypost/api");
import { EmailTemplate } from "@/components/emailTemplate";
const { Resend } = require("./src/resend");

export async function POST(req: Request) {
  const resend = new Resend(process.env.NEXT_PUBLIC_RESEND);
  const api = new EasyPost(process.env.NEXT_PUBLIC_EASYPOST_TEST!);
  try {
    const data = await req.json();

    if (data.object === "Event" && data.description === "tracker.updated") {
      const event = await api.Event.retrieve(data.id);
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

      const response = await resend.emails.send({
        from: "Acme <onboarding@resend.dev>",
        to: ["frostbitezebra421@gmail.com"],
        subject: "Hello world",
        react: EmailTemplate({ firstName: "James" }),
        text: message,
      });

      return NextResponse.json("Email update was sent to the customer!", {
        status: 200,
      });
    } else {
      return NextResponse.json(
        "Not a Tracker event, so nothing to do here for now...",
        { status: 200 }
      );
    }
  } catch (error: any) {
    console.log("EASYPOST_WEBHOOK:", error);
    return new NextResponse("Error getting easypost webhook", { status: 500 });
  }
}
