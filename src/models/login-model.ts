import { z } from "zod";

export const LoginModel = z.object({
  email: z
    .string({
      required_error: "Email is required",
    })
    .email({
      message: "Please enter a valid email",
    })
    .trim()
    .min(6)
    .max(100)
    .toLowerCase(),
  password: z
    .string({
      required_error: "Password is required",
    })
    .min(6, {
      message: "Password must be at least 6 characters long",
    })
    .max(100, {
      message: "Password must be less than 100 characters long",
    })
    .regex(RegExp("^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$"), {
      message:
        "Password must contain at least 1 uppercase, 1 lowercase, and 1 number",
    }),
});

export type LoginModelType = z.infer<typeof LoginModel>;
