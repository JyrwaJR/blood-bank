import { NextRequest } from "next/server";
import { APIRes } from "../_lib/api-res";

export async function POST(req: NextRequest) {
  try {
  } catch (error: any) {
    return APIRes({
      status: 500,
      message: error.message,
      error: error,
    });
  }
}
