import { NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";

export async function DELETE(req: Request) {
  try {
    const { public_id } = await req.json();

    if (!public_id) {
      return NextResponse.json({ error: "Missing public_id" }, { status: 400 });
    }

    const result = await cloudinary.uploader.destroy(public_id);

    if (result.result !== "ok") {
      return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      message: "Image deleted successfully",
    });
  } catch{
    return NextResponse.json({ error: "Delete failed" }, { status: 500 });
  }
}
