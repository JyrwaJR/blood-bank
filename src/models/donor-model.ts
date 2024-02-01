import { z } from "zod";

export const DonorModel = z.object({
  id: z.string().optional(),
  user_id: z.string().optional(),
  blood_group: z.string({
    required_error: "Blood Group is required",
  }),
  donation_date: z.string({
    required_error: "Donation Date is required",
  }),
  created_at: z.string().optional(),
});

export type DonorModelType = z.infer<typeof DonorModel>;
