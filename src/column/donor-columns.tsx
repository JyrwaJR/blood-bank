/** @format */

import { ColumnDef } from "@tanstack/react-table";
import { RequestModelType } from "../models/request-model";

export const DonorColumns: ColumnDef<RequestModelType>[] = [
	{
		header: "ID",
		accessorKey: "id",
	},
	{
		header: "Blood Group",
		accessorKey: "blood_group",
	},
	{
		header: "Donation Date",
		accessorKey: "donation_date",
	},
	{
		header: "Created At",
		accessorKey: "created_at",
	},
];
