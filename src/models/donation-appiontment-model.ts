import { z } from "zod";

export const DonationAppointmentModel = z.object({
  id: z.string().optional(),
  user_id: z.string().optional(),
  donation_date: z.string({
    required_error: "Donation date is required",
  }),
  approve_for_donation: z
    .boolean({
      required_error: "Approve for donation is required",
    })
    .optional(),
});

export type DonationAppointmentModelType = z.infer<
  typeof DonationAppointmentModel
>;
