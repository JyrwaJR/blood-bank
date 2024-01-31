/** @format */

"use client";

import * as React from "react";

import { Button } from "@/src/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/src/components/ui/card";

import { useForm } from "react-hook-form";
import { ContactModel, ContactModelType } from "@/src/models/contact-model";
import { zodResolver } from "@hookform/resolvers/zod";
import CustomForm from "@/src/components/custom-form";
import { toast } from "@/src/components/ui/use-toast";
import { RequestFormFields } from "@/src/form/request-form-fields";
import { RequestModel, RequestModelType } from "@/src/models/request-model";
import { DataTable } from "@/src/components/data-table-components/data-table";
import { RequestColumns } from "@/src/column/columns";
import {
	DonationDetailsModel,
	DonationDetailsModelType,
} from "@/src/models/donation-details-model";
import { DonationDetailsFormFields } from "@/src/form/donation-details-form-fields";

export default function DonationDetailsForm() {
	const form = useForm<DonationDetailsModelType>({
		resolver: zodResolver(DonationDetailsModel),
	});
	const onSubmit = () => {
		try {
		} catch (error: any) {
			toast({ title: "Error", description: error.message });
		}
	};
	return (
		<div className="flex justify-center items-center w-full h-full">
			<div className="w-full sm:max-w-md sm:p-4">
				<Card className="w-full">
					<CardHeader>
						<CardTitle>Request</CardTitle>
						<CardDescription>
							Deploy your new project in one-click.
						</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="grid w-full items-center gap-4">
							<CustomForm
								form={form}
								className="grid w-full grid-cols-1 sm:grid-cols-1 xl:grid-cols-1 gap-2 md:gap-4"
								inputFields={DonationDetailsFormFields}
								onSubmit={onSubmit}
								loading={false}
							/>
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}

const mockData: RequestModelType[] = [
	{
		id: "1",
		pick_up_date: "2022-08-01",
		is_approve: true,
		blood_group: "A+",
		request_date: "2022-08-01",
		created_at: "2022-08-01T12:00:00Z",
		updatedAt: "2022-08-02T10:30:00Z",
	},
	{
		id: "2",
		pick_up_date: "2022-08-05",
		is_approve: false,
		blood_group: "B-",
		request_date: "2022-08-05",
		created_at: "2022-08-05T09:45:00Z",
		updatedAt: "2022-08-06T14:20:00Z",
	},
	// Add more mock data as needed
];
