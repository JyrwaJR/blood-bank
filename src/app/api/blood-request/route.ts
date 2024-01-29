import { NextRequest } from "next/server";
import { APIRes } from "../_lib/api-res";
import { HttpStatus } from "../_lib/https-status";
import { RequestModel } from "@/src/models/request-model";

export async function POST(req: NextRequest) {
  try {
    const reqBody = req.json();
    const isValidData = RequestModel.safeParse(reqBody);
  } catch (error: any) {
    return APIRes({
      status: HttpStatus.InternalServerError,
      message: error.message,
      error: error,
    });
  }
}
