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
import { RequestColumns } from "@/src/column/request-columns";
import {
	DonationDetailsModel,
	DonationDetailsModelType,
} from "@/src/models/donation-details-model";
import { DonationDetailsFormFields } from "@/src/form/donation-details-form-fields";
import RequestDialog from "@/src/components/request-dialog";
import axios from "axios";
import { DonorColumns } from "@/src/column/donor-columns";
import DonorDialog from "@/src/components/donor-dialog";

export default function DonorForm() {
	const [data, setData] = React.useState<RequestModelType[]>([]);
	const [isDialogOpen, setIsDialogOpen] = React.useState(false);
	const getData = async () => {
		try {
			const res = await axios.get("/api/donate");
			if (res.data.status === 200) {
				toast({ title: "Success", description: res.data.message });

				setData(res.data.data);
			}
		} catch (error: any) {
			toast({ title: "Error", description: error.message });
		}
	};

	React.useEffect(() => {
		getData();
	}, []);
	const handleOpenDialog = () => {
		setIsDialogOpen(true);
	};

	const handleCloseDialog = () => {
		setIsDialogOpen(false);
	};

	const handleAddButtonClick = () => {
		handleOpenDialog();
	};
	return (
		<div className="flex justify-center items-center h-screen p-6">
			<div className="px-6 w-full">
				<Card>
					<CardHeader>
						<CardTitle>Request Data</CardTitle>
						<CardDescription>View and manage your requests.</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="grid grid-cols-1 gap-4">
							<DataTable
								buttonTitle="Add"
								addButton={handleAddButtonClick}
								columns={DonorColumns}
								data={data}
							/>
							{isDialogOpen && (
								<DonorDialog open={isDialogOpen} onClose={handleCloseDialog} />
							)}
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
	},
	{
		id: "2",
		pick_up_date: "2022-08-05",
		is_approve: false,
		blood_group: "B-",
		request_date: "2022-08-05",
		created_at: "2022-08-05T09:45:00Z",
	},
	// Add more mock data as needed
];
