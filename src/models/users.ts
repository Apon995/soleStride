import mongoose, { Schema, Document, models } from "mongoose";

export interface User extends Document {
  name: string;
  email : string ; 
  password : string ; 
  role : "admin" | "client";
}

const UserSchema = new Schema<User>(
  {
    name: { type: String, required: true , trim : true  },
    email: { type: String , required : true , unique : true , lowercase : true },
    password: { type: String , required : true},
    role: { type: String , enum : ["admin","client"] , default : "client"},
  },
  { timestamps: true }
);

export const Users = models.Users || mongoose.model<User>("Users", UserSchema);


