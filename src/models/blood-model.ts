import { z } from "zod";

export const BloodModel = z.object({
  created_at: z.string().optional(),
  blood_group: z.string({
    required_error: "Blood Group is required",
  }),
  updated_at: z.string().optional(),
});
