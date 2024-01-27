import { z } from "zod";

export const HealthCheckModel = z.object({
  id: z.string().optional(),
  user_id: z.string().optional(),
  blood_group: z.string({
    required_error: "Blood group is required",
  }),
  is_approve: z.boolean({
    required_error: "Fit for donation is required",
  }),
  approved_by: z.string({
    required_error: "Approved by is required",
  }),
  weight: z.number({
    required_error: "Weight is required",
  }),
  height: z.number({
    required_error: "Height is required",
  }),
  blood_pressure: z.string({
    required_error: "Blood pressure is required",
  }),
  pulse_rate: z.string({
    required_error: "Pulse rate is required",
  }),
  any_disease: z.string({}).optional(),
  report_date: z.date({
    required_error: "Report date is required",
  }),
  donation_date: z.date({
    required_error: "Donation date is required",
  }),
});
