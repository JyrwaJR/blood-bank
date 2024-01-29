import { CustomFormFieldType } from "../components/custom-form";
import { BloodGroupOptions } from "./_lib/form-constant";

export const BloodFormFields:CustomFormFieldType[]=[
  {
    name: "blood_group",
    label: "Blood Group",
    select: true,
    options:BloodGroupOptions
  },
]