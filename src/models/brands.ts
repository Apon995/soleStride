import mongoose, { Schema, Document, models } from "mongoose";

export interface IBrand extends Document {
  name: string;
  description?: string;
  logo?: string ;
  website?: string;
}

const BrandSchema = new Schema<IBrand>(
  {
    name: { type: String, required: true },
    description: { type: String },
    logo: { type: String },
    website: { type: String },
  },
  { timestamps: true }
);

const Brand = models.Brand || mongoose.model<IBrand>("Brand", BrandSchema);

export { Brand };
