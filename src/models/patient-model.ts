import { z } from "zod";

export const PatientModel = z.object({
  id: z.string().optional(),
  blood_group: z.string({
    required_error: "Blood group is required",
  }),
  request_Id: z.string().optional(),
  created_at: z.string().optional(),
  
});
