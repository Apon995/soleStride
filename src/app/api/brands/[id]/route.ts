import { connectDB } from "@/lib/db";
import { Brand } from "@/models/brands";
import { NextResponse } from "next/server";

interface RouteParams {
  params : Promise<{id : string}>
}

export async function PUT(
  req: Request, context: RouteParams
) {
  await connectDB();
  const body = await req.json();
  const {id} = await context.params;
  try {
    const updated = await Brand.findByIdAndUpdate( id, body, {
      new: true,
    });
    return NextResponse.json(updated);
  } catch (error:unknown) {
    let message = "Something went wrong";

    if (error instanceof Error) {
      message = error.message;
    }

    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function DELETE(
  _: Request, context : RouteParams
) {
  await connectDB();
  const {id} = await context.params

  try {
    await Brand.findByIdAndDelete(id);
    return NextResponse.json({ message: "Brand deleted successfully" });
  } catch (error:unknown) {
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
