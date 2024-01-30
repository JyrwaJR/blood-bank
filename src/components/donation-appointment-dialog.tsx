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
import { MakeDonationAppointmentFormFields } from "../form/make-donation-appointment-form-fields";
import { toast } from "./ui/use-toast";
import axios from "axios";
import { useAuthContext } from "../context/useAuthContext";

type Props = {
  open: boolean;
  onClose: () => void;
};
const DonationAppointmentDialog = ({ open, onClose }: Props) => {
  const { user } = useAuthContext();
  const form = useForm({
    resolver: zodResolver(MakeDonationAppointmentModel),
  });
  const onSubmit = async (data: MakeDonationAppointmentType) => {
    try {
      const payLoad = {
        donation_date: data.donation_date,
        user_id: user?.id,
      };
      const res = await axios.post("/api/donate/donation-appointment", payLoad);
      if (res.data.status === 200) {
        toast({
          title: "Success",
          description: res.data.message,
        });
        return;
      }
      toast({
        title: "OOP!",
        description: res.data.message,
      });
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
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when {`you're`} done.
          </DialogDescription>
        </DialogHeader>
        <div className='grid  w-full gap-4 py-4'>
          <CustomForm
            form={form}
            className='grid   w-full grid-cols-1 sm:grid-cols-1 xl:grid-cols-1 gap-2 md:gap-4'
            inputFields={MakeDonationAppointmentFormFields}
            // inputFields={BloodFormFields}
            onSubmit={onSubmit}
            loading={false}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DonationAppointmentDialog;
