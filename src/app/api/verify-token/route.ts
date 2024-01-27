import { jwtVerify } from "jose";
import { NextRequest, NextResponse } from "next/server";
import { HttpStatus } from "../_lib/https-status";

class AuthenticationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "Expired Token";
  }
}

export async function verifyToken({ request }: { request: NextRequest }) {
  try {
    const token = request.cookies.get("token")?.value || "";
    if (!token) {
      throw new AuthenticationError("Token is not provided");
    }
    const key = process.env.JWT_SECRET_KEY!;
    const decodedToken = await jwtVerify(token, new TextEncoder().encode(key));
    return decodedToken.payload;
  } catch (error: any) {
    switch (error.code) {
      case "ERR_JWT_EXPIRED":
        NextResponse.redirect(new URL("/auth/logout", request.url));
        throw new AuthenticationError(
          "Token has expired, Please login again to get a new token"
        );
      case "ERR_JWT_INVALID":
        NextResponse.redirect(new URL("/auth/logout", request.url));
        throw new AuthenticationError("Token is invalid");

      case "ERR_JWT_CLAIM_INVALID":
        NextResponse.redirect(new URL("/auth/logout", request.url));
        throw new AuthenticationError("Token claim is invalid");

      case "ERR_JWT_NO_VERIFY_CALLBACK":
        NextResponse.redirect(new URL("/auth/logout", request.url));
        throw new AuthenticationError("Token has no verify callback");
      default:
        NextResponse.redirect(new URL("/auth/logout", request.url));
        throw error;
    }
  }
}

export async function POST(request: NextRequest, response: NextResponse) {
  try {
    // Get the token from the request cookies
    const decode = await verifyToken({ request });
    return NextResponse.json({
      status: HttpStatus.OK,
      data: decode,
      token: request.cookies.get("token")?.value,
      message: "Token is valid",
    });
  } catch (error: any) {
    // Handle JWT expiration and other errors
    if (error.code === "ERR_JWT_EXPIRED") {
      // Expired token, perform logout
      await response.cookies.set("token", "", {
        path: "/",
        httpOnly: true,
        expires: new Date(0),
      });
      return NextResponse.json({
        status: HttpStatus.Unauthorized,
        message: "Token has expired",
        error: error,
      });
    } else {
      // Other internal errors
      return NextResponse.json({
        status: HttpStatus.InternalServerError,
        message: "Token has expire",
        error: error,
      });
    }
  }
}
