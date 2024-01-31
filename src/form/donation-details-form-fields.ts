/** @format */

import { CustomFormFieldType } from "../components/custom-form";
import { BloodGroupOptions } from "./_lib/form-constant";

export const DonationDetailsFormFields: CustomFormFieldType[] = [
	{
		name: "blood_group",
		label: "Blood Group",
		select: true,
		options: BloodGroupOptions,
	},
	{
		name: "units",
		label: "Units",
	},
	{
		name: "donation_at",
		label: "Donation Date",
		type: "date",
	},
	{
		name: "donated_by",
		label: "Donated By",
		type: "text",
	},
	{
		name: "is_donated",
		label: "Donated",
		select: true,
		options: [
			{
				value: true,
				label: "Yes",
			},
			{
				value: false,
				label: "No",
			},
		],
	},
];
