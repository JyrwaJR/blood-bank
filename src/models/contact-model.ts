import { z } from "zod";

export const ContactModel = z.object({
  name: z.string({
    required_error: "Name Group is required",
  }),
  email: z.string({
    required_error: "Email Group is required",
  }),
  message: z.string({
    required_error: "Message Group is required",
  }),
});

export type ContactModelType = z.infer<typeof ContactModel>;