import mongoose, { Schema, Document, models } from "mongoose";

export interface IProduct extends Document {
  // Basic info
  name: string;
  description: string;
  category: string;
  brand: string;

  // Pricing
  price: number;
  originalPrice?: number;
  taxRate: number;

  // Inventory
  sku: string;
  stock: number;
  lowStockThreshold: number;
  inStock: boolean;
  trackQuantity: boolean;

  // Variants
  sizes: string[];
  colors: string[];

  // Media
  images: {
    id?: string;
    url?: string;
  }[];
  featuredImage: {
    id: string;
    url: string;
  };

  // Shipping
  weight: number;
  dimensions: {
    length: number;
    width: number;
    height: number;
  };

  // SEO
  seoTitle: string;
  seoDescription: string;
  slug: string;

  // Additional
  tags: string[];
  featured: boolean;
  status: "draft" | "active" | "archived";
}

const ProductSchema = new Schema<IProduct>(
  {

    name: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    brand: { type: String, required: true },

 
    price: { type: Number, required: true },
    originalPrice: { type: Number , required : false },
    taxRate: { type: Number, required: false },

    sku: { type: String, required: true },
    stock: { type: Number, required: true },
    lowStockThreshold: { type: Number, required: false },
    inStock: { type: Boolean, default: true },
    trackQuantity: { type: Boolean, default: true },
    sizes: [{ type: String , required: true }],
    colors: [{ type: String , required : true}],
    images: [
      {
        id: { type: String, required: false },
        url: { type: String, required: false },
      },
    ],
    featuredImage: {
      id: { type: String || null, required: true },
      url: { type: String, required: true },
    },

    weight: { type: Number, required: true },
    dimensions: {
      length: { type: Number, required: false },
      width: { type: Number, required: false },
      height: { type: Number, required: false },
    },

    seoTitle: { type: String, required: true },
    seoDescription: { type: String, required: true },
    slug: { type: String, required: true },

    tags: [{ type: String }],
    featured: { type: Boolean, default: false },
    status: {
      type: String,
      enum: ["draft", "active", "archived"],
      default: "draft",
    },
  },
  { timestamps: true }
);


const Product = models.Product || mongoose.model<IProduct>("Product", ProductSchema);

export { Product };
