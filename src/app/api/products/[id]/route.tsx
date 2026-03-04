import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Product } from "@/models/product";


interface RouteParams {
  params: Promise<{ id: string }>
}


export async function GET(req: Request, context: RouteParams) {
  try {
    await connectDB();
    const { id } = await context.params;
    const product = await Product.findById(id);
    if (!product) return NextResponse.json({ error: "Product not found" }, { status: 404 });
    return NextResponse.json(product);
  } catch {
    return NextResponse.json({ error: "Invalid product ID" }, { status: 400 });
  }
}



export async function PUT(req: Request, context: RouteParams) {
  try {
    await connectDB();
    const body = await req.json();
    const { id } = await context.params;
    const updated = await Product.findByIdAndUpdate(id, body, { new: true });
    return NextResponse.json(updated);
  } catch {
    return NextResponse.json({ error: "Update failed" }, { status: 400 });
  }
}

export async function DELETE(req: Request, context: RouteParams) {
  try {
    await connectDB();
    const { id } = await context.params;
    await Product.findByIdAndDelete(id);
    return NextResponse.json({ message: "Product deleted" });
  } catch {
    return NextResponse.json({ error: "Delete failed" }, { status: 400 });
  }
}
