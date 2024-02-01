/** @format */

"use client";

import * as React from "react";

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/src/components/ui/card";

import { toast } from "@/src/components/ui/use-toast";
import { RequestModelType } from "@/src/models/request-model";
import { DataTable } from "@/src/components/data-table-components/data-table";
import { RequestColumns } from "@/src/column/request-columns";
import axios from "axios";
import RequestDialog from "@/src/components/request-dialog";

export default function RequestForm() {
	const [data, setData] = React.useState<RequestModelType[]>([]);
	const [isDialogOpen, setIsDialogOpen] = React.useState(false);
	const getData = async () => {
		try {
			const res = await axios.get("/api/request");
			if (res.data.status === 200) {
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
								columns={RequestColumns}
								data={data}
							/>
							{isDialogOpen && (
								<RequestDialog
									open={isDialogOpen}
									onClose={handleCloseDialog}
								/>
							)}
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
