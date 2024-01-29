import { z } from "zod";

export const BloodStockModel = z.object({
  id: z.string().optional(),
  blood_group: z.string({
    required_error: "Blood Group is required",
  }),
  condition: z.string({
    required_error: "Condition is required",
  }),
  created_at: z.string().optional(),
  updated_at: z.string().optional(),
  blood_bags: z.number({
    required_error: "Blood Bags is required",
  }),
});

export type BloodStockType = z.infer<typeof BloodStockModel>;
