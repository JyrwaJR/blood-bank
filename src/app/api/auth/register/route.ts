import { NextRequest } from "next/server";
import prisma from "../../../../../prisma/client";
import { APIRes } from "../../_lib/api-res";
import { HttpStatus } from "../../_lib/https-status";
import { RegisterModel } from "@/src/models/register-model";
import { hashPassword } from "../../_lib/hash-password";

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const isValidBody = RegisterModel.safeParse(reqBody);
    if (!isValidBody.success) {
      console.log(isValidBody.error.issues);
      return APIRes({
        status: HttpStatus.BadRequest,
        message: "Invalid Body",
        error: isValidBody.error.issues,
      });
    }
    const data = isValidBody.data;
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
    const isFoundUser = await prisma.auth.findUnique({
      where: {
        email: data.email,
      },
    });
    if (isFoundUser) {
      return APIRes({
        status: HttpStatus.Conflict,
        message: "User already exists with this email",
      });
    }
    const hashedPassword = await hashPassword({ password: data.password });
    const user = await prisma.auth.create({
      data: {
        email: data.email,
        password: hashedPassword,
        last_login: new Date(),
      },
    });
    if (!user) {
      return APIRes({
        status: HttpStatus.InternalServerError,
        message: "Something went wrong",
      });
    }
    await prisma.user.create({
      data: {
        first_name: data.firstName,
        id: user.id,
        last_name: data.lastName,
        address: data.address,
        mobile_no: data.mobileNo,
        age: data.age,
        email: data.email,
        created_at: new Date(),
      },
    });
    return APIRes({
      status: HttpStatus.OK,
      message: "Successfully registered, Please login",
      data: user,
    });
  } catch (error: any) {
    return APIRes({
      status: HttpStatus.InternalServerError,
      message: error.message,
      error: error,
    });
  } finally {
    prisma.$disconnect();
  }
}
