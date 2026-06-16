import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  
  if (!token) {
    const loginUrl = new URL("/signin", req.url);

    loginUrl.searchParams.set("redirect", req.nextUrl.pathname);

    return NextResponse.redirect(loginUrl);
  }

  try {
    const decode: any = jwt.verify(token, process.env.JWT_SECRET as string);
    
    if (decode.role !== "admin") {
      return NextResponse.redirect(new URL("/", req.url));
    }
     

     NextResponse.next();
     return 
  } catch (error) {
    NextResponse.redirect(new URL("/signin", req.url));
    return;
  }
}

export const config = {
  matcher: ["/admin/:path*"],
};
