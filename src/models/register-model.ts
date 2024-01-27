import { z } from "zod";
import { LoginModel } from ".";

export const RegisterModel = LoginModel.extend({
  firstName: z
    .string()
    .min(1)
    .max(100)
    .regex(/^[a-zA-Z]+$/, {
      message: "First name must contain only letters",
    })
    .trim(),
  lastName: z
    .string()
    .min(1)
    .max(100)
    .regex(/^[a-zA-Z]+$/, {
      message: "Last name must contain only letters",
    })
    .trim(),
  confirmPassword: LoginModel.shape.password,
  // mobileNo: z.preprocess((a) => parseInt(z.string().parse(a), 10), z.number()),
  mobileNo: z
    .string({
      required_error: "Mobile number is required",
    })
    .min(10)
    .max(10)
    .regex(/^[0-9]+$/, {
      message: "Mobile number must contain only numbers",
    }),
  // age: z.preprocess((a) => parseInt(z.string().parse(a), 10), z.number()),
  age: z
    .string()
    .min(1)
    .max(3)
    .regex(/^[0-9]+$/, {
      message: "Age must contain only numbers",
    }),
  address: z
    .string({
      required_error: "Address must be a string",
    })
    .min(3, {
      message: "Address must be atleast 3 characters long",
    })
    .max(100, {
      message: "Address must be less than 100 characters long",
    })
    .trim(),
});

export type RegisterModelType = z.infer<typeof RegisterModel>;
