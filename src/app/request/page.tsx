"use client";

import * as React from "react";

import { Button } from "@/src/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";
import { useForm } from "react-hook-form";
import { ContactModel, ContactModelType } from "@/src/models/contact-model";
import { zodResolver } from "@hookform/resolvers/zod";
import CustomForm from "@/src/components/custom-form";
import { ContactFormFields } from "@/src/form/contact-form-fields";
import { toast } from "@/src/components/ui/use-toast";
import { RequestFormFields } from "@/src/form/request-form-fields";
import { RequestModel, RequestModelType } from "@/src/models/request-model";
import { ScrollArea } from "@radix-ui/react-scroll-area";

export default function RequestForm() {
  const form = useForm<RequestModelType>({
    resolver: zodResolver(RequestModel),
  });
  const onSubmit = () => {
    try {
    } catch (error: any) {
      toast({ title: "Error", description: error.message });
    }
  };
  return (
    <div className='flex justify-center items-center lg:h-screen '>
      <div className='grid overflow-auto grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4  '>
        <div className='overflow-auto'>
          <Card className='w-full sm:w-[250px] lg:w-[450px]'>
            <CardHeader>
              <CardTitle>Request</CardTitle>
              <CardDescription>
                Deploy your new project in one-click.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className='grid w-full items-center gap-4'>
                <CustomForm
                  form={form}
                  className='grid w-full grid-cols-1 sm:grid-cols-1 xl:grid-cols-1 gap-2 md:gap-4 '
                  inputFields={RequestFormFields}
                  onSubmit={onSubmit}
                  loading={false}
                />
              </div>
            </CardContent>
          </Card>
        </div>
        <div>
          <Card className='w-full sm:w-[250px] lg:w-[450px]'>
            <CardHeader>
              <CardTitle>Request</CardTitle>
              <CardDescription>
                Deploy your new project in one-click.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className='grid w-full items-center gap-4'>
                <CustomForm
                  form={form}
                  className='grid w-full grid-cols-1 sm:grid-cols-1 xl:grid-cols-1 gap-2 md:gap-4 '
                  inputFields={RequestFormFields}
                  onSubmit={onSubmit}
                  loading={false}
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
