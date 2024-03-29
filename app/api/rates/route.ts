import { formatCents } from "@/lib/utils";
import { Category } from "@/types";
import { NextResponse } from "next/server";
const EasyPost = require("@easypost/api");
const stripe = require("stripe")(process.env.NEXT_PUBLIC_STRIPE_SECRET);
interface Address {
  line1: string;
  line2: string | null;
  city: string;
  state: string;
  postal_code: string;
  country: string;
}
interface FormData {
  values: {
    name: string;
    address: Address;
    phone?: string;
    firstName: string;
    lastName: string;
  };
  parcel: {
    product: {
      id: string;
      name: string;
      price: number;
      image: string;
      categories: {
        data: Category[];
      };
    };
    quantity: number;
  }[];
  selectedShipping: "standard" | "express";
}
interface RequestWithData extends Request {
  json(): Promise<FormData>;
}

export async function POST(req: RequestWithData) {
  try {
    const data = await req.json();

    if (!data.values.address) {
      return new NextResponse("Client Error: Invalid or missing address data", {
        status: 400,
      });
    }

    const { parcel } = data;
    const { name } = data.values;
    const { line1, city, state, postal_code, country } = data.values.address;

    if (!process.env.NEXT_PUBLIC_EASYPOST_TEST || !stripe || !EasyPost) {
      return NextResponse.json("Server side error", { status: 500 });
    }

    const api = new EasyPost(process.env.NEXT_PUBLIC_EASYPOST_TEST);

    // Add verification for the address
    const to_address = await api.Address.create({
      name: name,
      street1: line1,
      city: city,
      state: state,
      zip: postal_code,
      country: country,
      phone: data.values?.phone?.slice(1, -1),
    });

    // Calculate parcel weight and which package to use
    const parcelWeight = parcel.reduce(
      (accumulator, currentValue) =>
        accumulator +
        currentValue.product.categories.data[0].attributes.parcel.weight *
          currentValue.quantity,
      0
    );

    // Figure out what parcel package to use and give that to the easypost api
    // !Important: This is a simplified version of the logic that would be used in a real-world application. Fix it to match the actual logic.
    const parcelVolumes = parcel.map((item) => ({
      id: item.product.id,
      volume:
        item.product.categories.data[0].attributes.parcel.height *
        item.product.categories.data[0].attributes.parcel.width *
        item.product.categories.data[0].attributes.parcel.length,
      dimensions: {
        length: item.product.categories.data[0].attributes.parcel.length,
        width: item.product.categories.data[0].attributes.parcel.width,
        height: item.product.categories.data[0].attributes.parcel.height,
      },
    }));

    let chosenPackage = parcelVolumes.reduce((maxParcel, currentParcel) => {
      return currentParcel.volume > maxParcel.volume
        ? currentParcel
        : maxParcel;
    }, parcelVolumes[0]);

    const calculatedParcel = {
      length: chosenPackage.dimensions.length,
      width: chosenPackage.dimensions.width,
      height: chosenPackage.dimensions.height,
      weight: parcelWeight,
    };

    // Create shipping label using EasyPost API: fill in user details from the form and parcel data from cart
    const shipment = await api.Shipment.create({
      // Get Karens address and set it to the from address
      from_address: {
        street1: "522 1/2 N Avenue 50",
        city: "Los Angeles",
        state: "CA",
        zip: "90042",
        country: "US",
        company: "GWEart",
        phone: "323-371-5202",
      },
      to_address: {
        street1: to_address.street1,
        city: to_address.city,
        state: to_address.state,
        zip: to_address.zip,
        country: to_address.country,
        name: to_address.name,
        phone: to_address.phone,
      },
      // Pass the parcel information from the cart
      parcel: calculatedParcel,
    });

    // Get standard rates
    const standard = shipment.lowestRate(["USPS"], ["First"]);
    const express = shipment.lowestRate(["USPS"], ["Express"]);

    const chosenRate =
      data.selectedShipping === "standard" ? standard.rate : express.rate;

    const lineItems = parcel.map((item) => ({
      amount: `${formatCents(item.product.price)}`,
      reference: item.product.name,
      quantity: Number(item.quantity),
    }));

    const tax = await stripe.tax.calculations.create({
      currency: "usd",
      customer_details: {
        address: {
          line1: line1,
          city: city,
          state: state,
          postal_code: postal_code,
          country: country,
        },
        address_source: "shipping",
      },
      line_items: lineItems,
      shipping_cost: {
        amount: `${formatCents(chosenRate)}`,
      },
      expand: ["line_items"],
    });

    return NextResponse.json({
      standard,
      express,
      tax: tax.tax_amount_exclusive / 100,
    });
  } catch (error: any) {
    console.log("RATES:", error);
    return new NextResponse("Error getting rates", { status: 500 });
  }
}
