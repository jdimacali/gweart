import { API_URL } from "@/lib/utils";
import axios from "axios";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json();

    if (!name || !email || !message) {
      return new NextResponse("Missing required field", { status: 500 });
    }

    const response = await axios.post(`${API_URL}/api/contact-emails`, {
      data: {
        name: name,
        email: email,
        message: message,
      },
    });

    return NextResponse.json(response.data);
  } catch (error: any) {
    console.error("Contact", error);
    return new NextResponse("Contact", { status: 500 });
  }
}
