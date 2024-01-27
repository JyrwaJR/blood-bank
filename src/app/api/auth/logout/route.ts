import { NextRequest, NextResponse } from "next/server";
import { HttpStatus } from "../../_lib/https-status";
export async function POST(request: NextRequest) {
  try {
    const response = NextResponse.json({
      message: "Successfully Logout",
      status: HttpStatus.OK,
    });
    await response.cookies.set("token", "", {
      path: "/",
      httpOnly: true,
      expires: new Date(0),
    });
    NextResponse.redirect(new URL("/auth", request.url));
    return response;
  } catch (error: any) {
    return NextResponse.json({
      message: error.message,
      error: error,
      status: HttpStatus.InternalServerError,
    });
  }
}
