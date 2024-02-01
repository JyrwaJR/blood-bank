/** @format */

import { CustomFormFieldType } from "../components/custom-form";
import { BloodGroupOptions } from "./_lib/form-constant";
export const DonorFormField: CustomFormFieldType[] = [
	{
		name: "blood_group",
		label: "Blood Group",
		select: true,
		options: BloodGroupOptions,
	},
	{
		name: "donation_date",
		label: "Donation Date",
		type: "date",
	},
];
