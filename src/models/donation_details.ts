import { z } from "zod";

export const DonationDetailsModel = z.object({
  id: z.string().optional(),
  user_id: z.string().optional(),
  blood_group: z.string({
    required_error: "Blood group is required",
  }),
  units: z.number({
    required_error: "Units is required",
  }),
  donation_at: z.date({
    required_error: "Donation date is required",
  }),
  donated_by: z.string({
    required_error: "Donated by is required",
  }),
  is_donated: z.boolean({
    required_error: "Is donated is required",
  }),
});
