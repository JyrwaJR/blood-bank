import { z } from "zod";

export const HealthReportModel = z.object({
  id: z.string().optional(),
  blood_group: z.string({
    required_error: "Blood Group is required",
  }),

  approved_by: z.string({
    required_error: "Donation date is required",
  }),
  height: z.number({}),
  weight: z.number({}),
  blood_pressure: z.number({}),
  pulse_rate: z.number({}),
  any_diseases: z.string().optional(),
  report_date: z.number(),
  donation_date: z.string({
    required_error: "Donation date is required",
  }),
  created_at: z.string().optional(),
  updated_at: z.string().optional(),
});
