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
import { BloodStockModel, BloodStockType } from "../models/blood-stock-model";
import { BloodStockFormFields } from "../form/blood-stock-form-fields";

type Props = {
  open: boolean;
  onClose: () => void;
};
const BloodStockDialog = ({ open, onClose }: Props) => {
  const { user } = useAuthContext();
  const form = useForm({
    resolver: zodResolver(BloodStockModel),
  });
  const onSubmit = async (data: BloodStockType) => {
    try {
      const payload: BloodStockType = {
        blood_group: data.blood_group,
        blood_bags_unit: data.blood_bags_unit,
        condition: data.condition,
      };
      // TODO: Add the endpoint
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
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Blood Stock</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when {`you're`} done.
          </DialogDescription>
        </DialogHeader>
        <div className='grid w-full gap-4 py-4'>
          <CustomForm
            form={form}
            className='grid w-full grid-cols-1 sm:grid-cols-1 xl:grid-cols-1 gap-2 md:gap-4'
            inputFields={BloodStockFormFields}
            onSubmit={onSubmit}
            loading={false}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BloodStockDialog;
