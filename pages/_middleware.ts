import { NextApiRequest } from "next";
import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextApiRequest) {
  const token = await getToken({ req, secret: process.env.JWT_SECRET });
  const { url } = req;

  if (token && url === "/login") {
    return NextResponse.redirect("/");
  }

  if (url.includes("/login") || url.includes("/api/auth") || token) {
    return NextResponse.next();
  }

  if (!token && url !== "/login") {
    return NextResponse.redirect("/login");
  }
}