import { NextRequest } from "next/server";
import { APIRes } from "../../_lib/api-res";
import { HttpStatus } from "../../_lib/https-status";
import { RequestModel, RequestModelType } from "@/src/models/request-model";
import prisma from "../../../../../prisma/client";
import { getUserById } from "../../_lib/get-user-by-id";

export async function POST(req: NextRequest) {
  try {
    const reqBody = await req.json();
    const isValidData = RequestModel.safeParse(reqBody);
    if (!isValidData.success) {
      return APIRes({
        status: HttpStatus.BadRequest,
        message: "invalid data",
        error: isValidData.error.issues,
      });
    }
    const isConnectedToDb = prisma
      .$connect()
      .then(() => true)
      .catch(() => false);
    if (!isConnectedToDb) {
      return APIRes({
        message: "Connection error",
        status: HttpStatus.GatewayTimeout,
      });
    }
    const data: RequestModelType = isValidData.data;
    if (!data.user_id) {
      return APIRes({
        message: "User id is required",
        status: HttpStatus.BadRequest,
      });
    }
    const user = getUserById({ id: data.user_id });
    if (!user) {
      return APIRes({
        message: "User not found",
        status: HttpStatus.NotFound,
      });
    }
    const AddedBloodRequestByUserId = await prisma.request.create({
      data: {
        blood_group: data.blood_group,
        user_id: data.user_id,
        request_date: data.request_date,
      },
    });
    if (!AddedBloodRequestByUserId) {
      return APIRes({
        message: "Something went wrong when making for a blood request",
        status: 500,
        data: AddedBloodRequestByUserId,
      });
    }

    return APIRes({
      message: "Blood has been requested please wait for approval",
      data: AddedBloodRequestByUserId,
      status: HttpStatus.OK,
    });
  } catch (error: any) {
    return APIRes({
      status: HttpStatus.InternalServerError,
      message: error.message,
      error: error,
    });
  }
}
