import { z } from "zod";

export const MakeDonationAppointmentModel = z.object({
  donation_date: z.string({
    required_error: "Donation Date is required",
  }),
});

export type MakeDonationAppointmentType = z.infer<
  typeof MakeDonationAppointmentModel
>;
