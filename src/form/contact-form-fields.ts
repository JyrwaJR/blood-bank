import { CustomFormFieldType } from "../components/custom-form";

export const ContactFormFields: CustomFormFieldType[] = [
  {
    name: "name",
    label: "Name",
    type: "text",
  },
  {
    name: "email",
    label: "Email",
    type: "email",
  },
  {
    name: "message",
    label: "Message",
    type: "textarea",
  },
];
