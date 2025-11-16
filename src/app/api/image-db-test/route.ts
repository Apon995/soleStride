import { NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";

export async function GET() {
  try {
    const result = await cloudinary.api.ping();

    return NextResponse.json({
      success: true,
      message: "✅ Cloudinary connected successfully!",
      cloud_name: result.cloud_name,
    });
  } catch (error: unknown) {
    let message = "Something went wrong";

  if (error instanceof Error) {
    message = error.message;
  }

  return NextResponse.json(
    { error: message },
    { status: 500 }
  );
  }
}
