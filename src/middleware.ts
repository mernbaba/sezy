import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { cookies } from "next/headers";
import { getCookie } from "cookies-next";
import type { Student } from "@prisma/client";

export const middleware = async (request: NextRequest) => {
  const userCookie = await getCookie("sezy", { cookies });
  const user = userCookie ? (JSON.parse(userCookie) as Student) : undefined;

  if (!user) {
    return NextResponse.redirect(new URL("/login", request.url));
  } else {
    if (!user?.emailverified) {
      console.log("Email not verified");
      return NextResponse.redirect(new URL("/verify-email", request.url));
    }
  }

  return NextResponse.next();
};

export const config = {
  matcher: [
    "/send-money/:path*",
    "/transactions/:path*",
    "/apply-for-loan/:path*",
    "/forex-card/:path*",
  ],
};
