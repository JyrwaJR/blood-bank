import { CustomFormFieldType } from "../components/custom-form";
import { BloodGroupOptions } from "./_lib/form-constant";

export const RequestFormFields: CustomFormFieldType[] = [
  {
    name: "blood_group",
    select: true,
    label: "Blood Group",
    options: BloodGroupOptions,
  },
  {
    name: "request_date",
    type: "date",
    label: "Request Date",
  },
];
