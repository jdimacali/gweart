import { NextResponse } from "next/server";
// const EasyPost = require("@easypost/api");
import { EmailTemplate } from "@/components/emailTemplate";
import { Resend } from "resend";

export async function POST(req: Request) {
  try {
    return NextResponse.json("Hello World", { status: 200 });
  } catch (error: any) {
    console.error("Dashboard", error);
    return new NextResponse("Error fetching image data", { status: 500 });
  }
}

// import { NextResponse } from "next/server";
// const EasyPost = require("@easypost/api");
// import { EmailTemplate } from "@/components/emailTemplate";
// import { Resend } from "resend";

// export async function POST(req: Request) {
//   const resend = new Resend(process.env.NEXT_PUBLIC_RESEND);
//   try {
//     const data = await req.json();

//     if (true) {
//       // if (data.object === "Event" && data.description === "tracker.updated") {
//       //   const event = await EasyPost.Event.receive(req.body);
//       //   const tracker = event.result;

//       //   let message = "Hey, this is GWEart. ";

//       //   if (tracker.status === "delivered") {
//       //     message += "Your package has arrived!";
//       //   } else {
//       //     const td = tracker.tracking_details
//       //       .reverse()
//       //       .find(
//       //         (trackingDetail: any) => trackingDetail.status === tracker.status
//       //       );
//       //     message += `There's an update on your package: ${tracker.carrier} says: ${td.message} in ${td.tracking_location.city}.`;
//       //   }

//       //   const response = await resend.emails.send({
//       //     from: "Acme <onboarding@resend.dev>",
//       //     to: ["frostbitezebra421@gmail.com"],
//       //     subject: "Hello world",
//       //     react: EmailTemplate({ firstName: "James" }),
//       //     text: "Hello world",
//       //   });

//       return NextResponse.json("Email update was sent to the customer!", {
//         status: 200,
//       });
//     } else {
//       return NextResponse.json(
//         "Not a Tracker event, so nothing to do here for now...",
//         { status: 200 }
//       );
//     }
//   } catch (error: any) {
//     console.log("RATES:", error);
//     return new NextResponse("Error getting easypost webhook", { status: 500 });
//   }
// }
