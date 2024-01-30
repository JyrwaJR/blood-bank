import { CustomFormFieldType } from "../components/custom-form";
import { BloodGroupOptions } from "./_lib/form-constant";
const BloodCondition = [
  {
    value: "fresh",
    label: "Fresh",
  },
  {
    value: "expired",
    label: "Expired",
  },
  {
    value: "expired",
    label: "Expired",
  },
];
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
    select: true,
    options: BloodCondition,
  },
  {
    name: "blood_bags_unit",
    label: "Blood Bags Unit",
    type: "number",
  },
];
