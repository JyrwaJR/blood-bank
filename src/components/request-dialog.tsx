/** @format */

import React from "react";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/src/components/ui/dialog";
import { Button } from "./ui/button";
import CustomForm from "./custom-form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
	MakeDonationAppointmentModel,
	MakeDonationAppointmentType,
} from "../models/make-donation-appointment-model";
import { makeDonationAppointmentFormFields } from "../form/make-donation-appointment-form-fields";
import { toast } from "./ui/use-toast";
import axios from "axios";
import { useAuthContext } from "../context/useAuthContext";
import { RequestModelType, RequestModel } from "../models/request-model";
import { RequestFormFields } from "../form/request-form-fields";

type Props = {
	open: boolean;
	onClose: () => void;
};
const RequestDialog = ({ open, onClose }: Props) => {
	const { user } = useAuthContext();
	const form = useForm({
		resolver: zodResolver(RequestModel),
	});
	const onSubmit = async (data: RequestModelType) => {
		try {
			return;
		} catch (error: any) {
			toast({
				variant: "destructive",
				title: "Error",
				description: error.message,
			});
		}
	};
	return (
		<Dialog open={open} onOpenChange={onClose}>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Request Dialog</DialogTitle>
					<DialogDescription>
						Make changes to your profile here. Click save when {`you're`} done.
					</DialogDescription>
				</DialogHeader>
				<div className="grid  w-full gap-4 py-4">
					<CustomForm
						form={form}
						className="grid   w-full grid-cols-1 sm:grid-cols-1 xl:grid-cols-1 gap-2 md:gap-4"
						inputFields={RequestFormFields}
						onSubmit={onSubmit}
						loading={false}
					/>
				</div>
			</DialogContent>
		</Dialog>
	);
};

export default RequestDialog;
