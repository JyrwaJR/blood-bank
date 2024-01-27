import { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  try {
    const token = req.cookies.get("token")?.value;
    if (token) {
      console.log("token");
    } else {
      console.log("no token");
    }
  } catch (error) {}
}
