import { CustomFormFieldType } from "../components/custom-form";

export const registerFormFields: CustomFormFieldType[] = [
  {
    label: "First Name",
    name: "firstName",
    type: "text",
    required: true,
  },
  {
    label: "Last Name",
    name: "lastName",
    type: "text",
    required: true,
  },
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
  {
    label: "Confirm Password",
    name: "confirmPassword",
    type: "password",
    required: true,
    helperText: "Enter your password",
  },
  {
    label: "Mobile No",
    name: "mobileNo",
    type: "text",
    required: true,
    helperText: "Enter your password",
  },
  {
    label: "Address",
    name: "address",
    type: "text",
    required: true,
    helperText: "Enter your password",
  },
  {
    label: "Age",
    name: "age",
    type: "text",
    required: true,
    helperText: "Enter your password",
  },
];
