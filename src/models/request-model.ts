import { z } from "zod";

export const RequestModel = z.object({
  id: z.string().optional(),
  patient_id: z.string().optional(),
  blood_group: z.string({ required_error: "Blood Group required" }),
  request_date: z.string({ required_error: "Request Date required" }),
  created_at: z.string().optional(),
});

export type RequestModelType = z.infer<typeof RequestModel>;