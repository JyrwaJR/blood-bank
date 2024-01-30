import { NextRequest } from "next/server";
import { APIRes } from "../../_lib/api-res";
import { BloodStockModel } from "@/src/models/blood-stock-model";

export async function POST(req: NextRequest) {
  try {
    const reqBody = await req.json();
    const isValidData = BloodStockModel.safeParse(reqBody);
    if (!isValidData.success) {
      return APIRes({
        status: 400,
        message: isValidData.error.issues[0].message,
        error: isValidData.error,
      });
    }
  } catch (error: any) {
    return APIRes({
      status: 500,
      message: error.message,
      error: error,
    });
  }
}
