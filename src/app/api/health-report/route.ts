import { NextRequest } from "next/server";
import { APIRes } from "../_lib/api-res";
import { HealthReportModel } from "@/src/models/health-report-model";
import prisma from "../../../../prisma/client";

export async function POST(req: NextRequest) {
  try {
    const reqBody = await req.json();
    const isValidData = HealthReportModel.safeParse(reqBody);
    if (!isValidData.success) {
      return APIRes({
        message: "invalid data",
        status: 405,
        error: isValidData.error.issues,
      });
    }
    const isConnected = prisma
      .$connect()
      .then(() => true)
      .catch(() => false);
    // TODO
  } catch (error: any) {
    return APIRes({
      status: 500,
      message: error.message,
      error: error,
    });
  }
}
