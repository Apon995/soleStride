import { connectDB } from "@/lib/db";
import { Users } from "@/models/users";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function POST (req : Request){
    await connectDB();
    const body = await req.json();


    const user = await Users.findOne({
        email : body.email
    })



    if(!user){
        return NextResponse.json({
            message : "User not found"
        }, {
            status : 404 
        })
    }
    

    

    const isPasswordCorrect = await bcrypt.compare(body.password, user.password);

    if(!isPasswordCorrect){
        return NextResponse.json({
            message : "Incorrect Password"
        } , {
            status : 401
        })
    }


    const token = jwt.sign(
        {
            id : user._id,
            role : user.role
        },
        process.env.JWT_SECRET!,
        {
            expiresIn : "1d"
           
        }

    )

    const response = NextResponse.json({
        message : "User logged successfully !",
    }, )

    response.cookies.set("token", token , {
        httpOnly : true , 
        secure : process.env.NODE_ENV === "production" , 
        sameSite : "strict",
        path : "/",
        maxAge : 60 * 60 * 24 
    })

    return response 

} 