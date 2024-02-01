/** @format */

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

import { useForm } from "react-hook-form";
import { ContactModel, ContactModelType } from "@/src/models/contact-model";
import { zodResolver } from "@hookform/resolvers/zod";
import CustomForm from "@/src/components/custom-form";
import { ContactFormFields } from "@/src/form/contact-form-fields";
import { toast } from "@/src/components/ui/use-toast";
import { RequestFormFields } from "@/src/form/request-form-fields";
import { RequestModel, RequestModelType } from "@/src/models/request-model";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { DataTable } from "@/src/components/data-table-components/data-table";
import { RequestColumns } from "@/src/column/columns";
import axios from "axios";

export default function RequestForm() {
  const [data, setData] = React.useState<RequestModelType[]>([]);
  const form = useForm<RequestModelType>({
    resolver: zodResolver(RequestModel),
  });
  const onSubmit = () => {
    try {
    } catch (error: any) {
      toast({ title: "Error", description: error.message });
    }
  };
  const getData = async () => {
    try {
      const res = await axios.get("/api/request");
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
    console.log(data);
  }, []);

  return (
    <div className='flex justify-center items-center h-screen'>
      <div className='grid overflow-auto grid-cols-1 sm:grid-cols-1 lg:grid-cols-3 gap-2 '>
        <div className='overflow-auto col-span-1 p-6'>
          <Card className='w-full'>
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
                  className='grid w-full grid-cols-1 sm:grid-cols-1 xl:grid-cols-1 gap-2 md:gap-4'
                  inputFields={RequestFormFields}
                  onSubmit={onSubmit}
                  loading={false}
                />
              </div>
            </CardContent>
          </Card>
        </div>
        <div className='overflow-auto col-span-2 p-6'>
          <Card className='w-full'>
            <CardHeader>
              <CardTitle>Request Data</CardTitle>
              <CardDescription>View and manage your requests.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className='grid grid-cols-1 gap-4'>
                <DataTable
                  // addButton={() => {}}
                  columns={RequestColumns}
                  data={data}
                  // isLoading={false}
                  // refetch={() => {}}
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

