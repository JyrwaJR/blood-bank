import { CustomFormFieldType } from "../components/custom-form";

export const LoginFormFields: CustomFormFieldType[] = [
  {
    label: "Email",
    name: "email",
    type: "email",
    required: true,
    helperText: "Enter your email address",
  },
  {
    label: "Password",
    name: "password",
    type: "password",
    required: true,
    helperText: "Enter your password",
  },
];
