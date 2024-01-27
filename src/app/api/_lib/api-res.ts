/* eslint-disable */
import { NextResponse } from "next/server";

type APIResType = {
  message: string;
  status: number;
  data?: any;
  error?: any;
  token?: any;
  code?: string;
};

export function APIRes({ message, status, data, error, code }: APIResType) {
  return NextResponse.json({
    message: message,
    status: status,
    data: data,
    code: code,
    error: error,
  });
}
