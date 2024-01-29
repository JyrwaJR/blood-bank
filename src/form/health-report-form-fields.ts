import { CustomFormFieldType } from "../components/custom-form";
import { BloodGroupOptions } from "./_lib/form-constant";

export const HealthReportFormFields: CustomFormFieldType[] = [
  {
    name: "blood_group",
    label: "Blood Group",
    select: true,
    options: BloodGroupOptions,
  },
  {
    name: "height",
    label: "Height",
  },
  {
    name: "weight",
    label: "Weight",
  },
  {
    name: "approved_by",
    label: "Approved By",
    type: "text",
  },
  {
    name: "pulse_rate",
    label: "Pulse Rate",
  },
  {
    name: "donation_date",
    label: "Donation Date",
    type: "date",
  },
  {
    name: "created_date",
    type: "date",
    label: "Created Date",
  },
  {
    name: "updated_date",
    type: "date",
    label: "Updated Date",
  },
];
