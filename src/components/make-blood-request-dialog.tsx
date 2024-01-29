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
import { RequestFormFields } from "../form/request-form-fields";
import { RequestModel, RequestModelType } from "../models/request-model";

type Props = {
  open: boolean;
  onClose: () => void;
};
const MakeBloodRequestDialog = ({ open, onClose }: Props) => {
  const { user } = useAuthContext();
  const form = useForm({
    resolver: zodResolver(RequestModel),
  });
  const onSubmit = async (data: RequestModelType) => {
    try {
      const payload: RequestModelType = {
        blood_group: data.blood_group,
        request_date: data.request_date,
        user_id: user?.id,
      };
      const res = await axios.post("/api/blood-request", payload);
      if (res.data.status === 200) {
        toast({
          title: "Successfully Make a request",
          description: res.data.message,
        });
        return;
      }
      console.log(res.data.error);

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
          <DialogTitle>Request Blood Bag</DialogTitle>
          <DialogDescription>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat
            distinctio temporatate sapiente repellat.
          </DialogDescription>
        </DialogHeader>
        <div className='grid  w-full gap-4 py-4'>
          <CustomForm
            form={form}
            className='grid   w-full grid-cols-1 sm:grid-cols-1 xl:grid-cols-1 gap-2 md:gap-4'
            inputFields={RequestFormFields}
            onSubmit={onSubmit}
            loading={false}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MakeBloodRequestDialog;
