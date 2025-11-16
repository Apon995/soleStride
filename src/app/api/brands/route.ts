import { connectDB } from "@/lib/db";
import { Brand } from "@/models/brands";
import { NextResponse } from "next/server";

export async function GET() {
  await connectDB();
  try {
    const brands = await Brand.find();
    return NextResponse.json(brands);
  } catch (error) {
    let message = "Something went wrong";

    if (error instanceof Error) {
      message = error.message;
    }

    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  await connectDB();
  const body = await req.json();
  try {
    const brand = await Brand.create(body);
    return NextResponse.json(brand);
  } catch (error) {
    let message = "Something went wrong";

    if (error instanceof Error) {
      message = error.message;
    }

    return NextResponse.json({ error: message }, { status: 500 });
  }
}
