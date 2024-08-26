import { cookies } from "next/headers";
import { NextResponse, NextRequest } from "next/server";
import { decrypt, deleteSession } from "./lib/utils/session";

const protectedRoutes = ["/dashboard", "/home", "/admin"];
const publicRoutes = ["/login", "/register", "/"];

export async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.includes(path);
  const isPublicRoute = publicRoutes.includes(path);

  const cookie = cookies().get("session")?.value;
  const session = await decrypt(cookie);
  console.log(session, "here is the session");

  if (!session && path !== "/login") {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }

  // If trying to access a protected route without a valid session, redirect to login
  if (isProtectedRoute && !session?.userId) {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }

  // If logged in and trying to access a public route, redirect to home
  if (isPublicRoute && session?.userId) {
    return NextResponse.redirect(new URL("/home", req.nextUrl));
  }

  // If the user is an admin, ensure they can access the admin route
  if (session?.isAdmin && path !== "/admin") {
    return NextResponse.redirect(new URL("/admin", req.nextUrl));
  }

  // If the path is "/login" and the user is already logged in, redirect to home
  if (path === "/login" && session?.userId) {
    return NextResponse.redirect(new URL("/home", req.nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/home", "/dashboard", "/login", "/register", "/", "/admin"], // Include all relevant routes
};
