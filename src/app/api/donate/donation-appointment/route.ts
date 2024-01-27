import { NextRequest } from "next/server";
import { APIRes } from "../../_lib/api-res";
import { DonationAppointmentModel } from "@/src/models/donation-appiontment-model";
import prisma from "../../../../../prisma/client";

export async function POST(req: NextRequest) {
  try {
    const reqBody = await req.json();
    const isValidData = await DonationAppointmentModel.safeParseAsync(reqBody);
    if (isValidData.success === false) {
      return APIRes({
        status: 405,
        message: "Invalid data",
        error: isValidData.error.issues,
      });
    }

    const isConnected = await prisma
      .$connect()
      .then(() => true)
      .catch(() => false);
    if (!isConnected) {
      return APIRes({
        status: 500,
        message: "Unable to connect to database",
      });
    }
    const isTwoAppointment = await prisma.donation_Appointment.findMany({
      where: {
        user_id: isValidData.data.user_id,
        approve_for_donation: false,
      },
    });
    if (isTwoAppointment.length > 3) {
      return APIRes({
        status: 405,
        message: "You have already two pending appointment",
      });
    }

    const donationAppointment = await prisma.donation_Appointment.create({
      data: {
        donation_date: isValidData.data.donation_date,
        approve_for_donation: isValidData.data.approve_for_donation,
        user_id: isValidData.data.user_id ?? "",
        created_at: new Date(),
      },
    });
    if (!donationAppointment) {
      return APIRes({
        status: 500,
        message: "Unable to create donation appointment",
      });
    }
    return APIRes({
      status: 200,
      message: "Donation appointment created",
      data: donationAppointment,
    });
  } catch (error: any) {
    return APIRes({
      status: 500,
      message: error.message,
      error: error,
    });
  }
}
