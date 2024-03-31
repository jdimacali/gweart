import { NextResponse } from "next/server";
const EasyPost = require("@easypost/api");

export async function POST(req: Request) {
  try {
    const data = await req.json();

    // if (
    //   parsedRequest.object === "Event" &&
    //   parsedRequest.description === "tracker.updated"
    // ) {
    //   const event = await easypost.Event.receive(req.body);
    //   const tracker = event.result;

    //   let message = "Hey, this is GWEart. ";
    
    //   if (tracker.status === "delivered") {
    //     message += "Your package has arrived!";
    //   } else {
    //     const td = tracker.tracking_details
    //       .reverse()
    //       .find((trackingDetail) => trackingDetail.status === tracker.status);
    //     message += `There's an update on your package: ${tracker.carrier} says: ${td.message} in ${td.tracking_location.city}.`;
    //   }

    //   const from = new Email("test@fromaddress.com");
    //   const subject = "Hello World from the SendGrid Node.js Library!";
    //   const to = new Email("customer@gmail.com");
    //   const content = new Content("text/plain", message);
    //   const mail = new Mail(from, subject, to, content);

    //   await Mail.send(mail);
    //   res.status(200).send("Email update was sent to the customer!");
    // } else {
    //   res
    //     .status(200)
    //     .send("Not a Tracker event, so nothing to do here for now...");
    // }

    return NextResponse.json({});
  } catch (error: any) {
    console.log("RATES:", error);
    return new NextResponse("Error getting rates", { status: 500 });
  }
}
