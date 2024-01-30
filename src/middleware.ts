import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  const pathName = req.nextUrl.pathname;

  try {
    if (token) {
      if (pathName === "/") {
        return NextResponse.redirect(new URL("/home", req.url));
      }
    } else {
      if (pathName !== "/") {
        return NextResponse.redirect(new URL("/", req.url));
      }
    }
  } catch (error) {
    return NextResponse.redirect(new URL("/", req.url));
  }
}
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
