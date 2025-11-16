import { NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";

export async function POST(request: Request) {
  try {
    const { public_ids } = await request.json();

    if (!public_ids || !Array.isArray(public_ids) || public_ids.length === 0) {
      return NextResponse.json(
        { success: false, message: "No public_ids provided" },
        { status: 400 }
      );
    }

    const result = await cloudinary.api.delete_resources(public_ids);

    return NextResponse.json({
      success: true,
      message: "✅ Images deleted successfully",
      result,
    });
  } catch (error:unknown) {
    let message = "Something went wrong";

    if (error instanceof Error) {
      message = error.message;
    }

    return NextResponse.json({ error: message }, { status: 500 });
  }
}
