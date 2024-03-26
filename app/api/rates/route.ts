import { NextResponse } from "next/server";
const Easypost = require("@easypost/api");

export async function POST(req: Request) {
  const data = await req.json();

  if (!process.env.NEXT_PUBLIC_EASYPOST_TEST) {
    return NextResponse.json("Server side error", { status: 500 });
  }

  const api = new Easypost(process.env.NEXT_PUBLIC_EASYPOST_TEST);

  try {
    // Create shipping label using EasyPost API: fill in user details from the form and parcel data from cart
    const shipment = await api.Shipment.create({
      // Get Karens address and set it to the from address
      from_address: {
        street1: "417 MONTGOMERY ST",
        street2: "FLOOR 5",
        city: "Los Angeles",
        state: "CA",
        zip: "90042",
        country: "US",
        company: "GWEart",
        phone: "415-123-4567",
      },
      to_address: {
        name: data.address.name,
        street1: data.address.line1,
        city: data.address.city,
        state: data.address.state,
        zip: data.address.postal_code,
        country: data.address.country,
        phone: "4155559999",
      },
      // Pass the parcel information from the cart
      parcel: {
        length: 5,
        width: 6,
        height: 7,
        weight: 8,
      },
    });

    return NextResponse.json(shipment);
  } catch (error: any) {
    console.log("RATES:", error);
    return new NextResponse("Error getting rates", { status: 500 });
  }
}
