import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { type JWTPayload } from "jose";
import { generateToken } from "../_lib/generate-token";
import { LoginModel as AuthModel } from "@/src/models";
import { APIErrorMessages } from "../_lib/api-error-message";
import { getAuthByEmail } from "./_lib/get-auth-by-email";
import { getUserById } from "../_lib/get-user-by-id";
import prisma from "../../../../prisma/client";
import { APIRes } from "../_lib/api-res";
import { HttpStatus } from "../_lib/https-status";

export async function POST(req: NextRequest) {
  const reqBody = await req.json();
  try {
    const isValidBody = await AuthModel.safeParseAsync(reqBody);
    if (!isValidBody.success) {
      return APIRes({
        status: HttpStatus.BadRequest,
        message: APIErrorMessages[HttpStatus.BadRequest],
        error: isValidBody.error.issues,
      });
    }
    const data = AuthModel.parse(reqBody);
    const isConnected = await prisma
      .$connect()
      .then(() => true)
      .catch(() => false);
    if (!isConnected) {
      return APIRes({
        status: HttpStatus.RequestTimeout,
        message: "Connection Error",
      });
    }

    const isFoundUser = await getAuthByEmail({
      email: data.email,
    });

    if (!isFoundUser) {
      return APIRes({
        status: HttpStatus.NotFound,
        message: "User not found with this email. Please register",
      });
    }

    const validPassword = await bcryptjs.compare(
      data.password,
      isFoundUser.password
    );

    if (!validPassword) {
      return APIRes({
        status: HttpStatus.Forbidden,
        message: "Incorrect password. Please try again",
      });
    }

    const user = await getUserById({
      id: isFoundUser.id,
    });
    if (!user) {
      return APIRes({
        status: HttpStatus.NotFound,
        message: "No user found with this email. Please register",
      });
    }
    const claim: JWTPayload = {
      id: isFoundUser.id,
      email: isFoundUser.email,
      name: user.first_name + " " + user.last_name,
      role: isFoundUser.role,
      address: user.address,
      mobileNo: user.mobile_no,
      age: user.age,
      createdAt: user.created_at,
      loginTime: new Date().toISOString(),
    };

    const token = await generateToken({
      claim: claim,
    });

    const response = NextResponse.json({
      message: "Redirecting to the next page",
      status: HttpStatus.OK,
      token: token,
      data: isFoundUser,
    });

    response.cookies.set("token", token, {
      httpOnly: true,
      path: "/",
      expires: new Date(Date.now() + 60 * 60 * 1000),
      maxAge: 60 * 60,
      name: "token",
      sameSite: "lax",
      secure: true,
      priority: "high",
      value: token,
    });
    return response;
  } catch (error: any) {
    return APIRes({
      status: HttpStatus.InternalServerError,
      error: error.message,
      message: APIErrorMessages[HttpStatus.InternalServerError],
    });
  } finally {
    await prisma.$disconnect();
  }
}
