import { CustomFormFieldType } from "../components/custom-form";
import { BloodGroupOptions } from "./_lib/form-constant";

export const BloodStockFormFields: CustomFormFieldType[] = [
  {
    name: "blood_group",
    label: "Blood Group",
    select: true,
    options: BloodGroupOptions,
  },
  {
    name: "condition",
    label: "Condition",
  },
  {
    name: "blood_bags",
    label: "Blood Bags",
  },
];
