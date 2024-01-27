import { Input } from "./ui/input";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
  Form,
} from "@/src/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";

import React from "react";
import { SubmitHandler, UseFormReturn } from "react-hook-form";
import { twMerge } from "tailwind-merge";
import { DialogFooter } from "./ui/dialog";
import { Button } from "./ui/button";
import { ScrollArea } from "./ui/scroll-area";

type OptionsT = {
  label: string;
  value: string | number | boolean;
};
type CustomFormProps<T> = {
  form: UseFormReturn<T | any>;
  defaultValue?: T | any;
  loading: boolean;
  inputFields: CustomFormFieldType[];
  className?: string;
  className2?: string;
  onSubmit: SubmitHandler<T | any>;
  buttonTitle?: string;
};

const CustomForm = <T,>({
  form,
  defaultValue,
  loading = false,
  inputFields,
  className,
  onSubmit,
  buttonTitle,
  className2,
}: CustomFormProps<T>) => {
  const defaultStyles =
    "grid w-full grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-2 md:gap-4";
  const style = twMerge(defaultStyles, className);
  const style2 = twMerge(className2);
  return (
    <CustomFormTag
      form={form}
      onSubmit={onSubmit}
      className={style2}
      isLoading={loading}
      buttonTitle={buttonTitle}
    >
      <div className={style}>
        {!loading ? (
          <React.Fragment>
            {inputFields.map((input: any, i) => (
              <div key={i} className='w-full'>
                <FormField
                  shouldUnregister
                  name={input.name}
                  control={form.control}
                  defaultValue={defaultValue?.[input.name]}
                  render={({ field }) => (
                    <div className='w-full'>
                      {input.select ? (
                        <FormItem className='w-full'>
                          <FormLabel>
                            {input.label}{" "}
                            {input.required && (
                              <span className='text-red-500'>*</span>
                            )}
                          </FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={defaultValue?.[input.name]}
                            value={field.value}
                          >
                            <FormControl className='w-full'>
                              <SelectTrigger>
                                <SelectValue placeholder={"Select an option"} />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {input.options?.map(
                                (option: OptionsT, i: number) => (
                                  <React.Fragment key={i}>
                                    <SelectItem value={option.value as string}>
                                      {option.label}
                                    </SelectItem>
                                  </React.Fragment>
                                )
                              )}
                            </SelectContent>
                            <FormMessage />
                            <FormDescription>
                              {input.helperText}
                            </FormDescription>
                          </Select>
                        </FormItem>
                      ) : (
                        <React.Fragment key={i}>
                          <FormItem className='w-full'>
                            <FormLabel>
                              {input.label}{" "}
                              {input.required && (
                                <span className='text-red-500'>*</span>
                              )}
                            </FormLabel>
                            <Input
                              {...field}
                              className='w-full'
                              placeholder={"Enter " + input.label}
                              type={input.type}
                            />
                            {/* <FormDescription>
                              {input.helperText}
                            </FormDescription> */}
                            <FormMessage />
                          </FormItem>
                        </React.Fragment>
                      )}
                    </div>
                  )}
                />
              </div>
            ))}
          </React.Fragment>
        ) : (
          <>
            {inputFields.map((input, i) => (
              <>
                <div
                  key={i}
                  className='w-full h-12 bg-gray-200 rounded-lg col-span-auto animate-pulse'
                />
              </>
            ))}
          </>
        )}
      </div>
    </CustomFormTag>
  );
};
export default CustomForm;

type CustomFormTagProps<T> = {
  form: UseFormReturn<T | any>;
  children: React.ReactNode;
  onSubmit: SubmitHandler<T | any>;
  isLoading?: boolean;
  className?: string;
  buttonTitle?: string;
};

export const CustomFormTag = <T,>({
  form,
  children,
  onSubmit,
  className,
  isLoading = false,
  buttonTitle = "Submit",
}: CustomFormTagProps<T>) => {
  const defaultStyles = "space-y-4 p-1";
  const styles = twMerge(defaultStyles, className);
  return (
    <Form {...form}>
      <ScrollArea>
        <form
          noValidate
          onSubmit={form.handleSubmit(onSubmit)}
          className={styles}
        >
          {children}
          <DialogFooter className='py-2 sm:pt-2 md:pt-3 lg:pt-4'>
            <Button
              disabled={!form.formState.isDirty || isLoading}
              type='submit'
              className='w-full'
            >
              {isLoading && (
                <div
                  className='inline-block mx-2 h-4 w-4 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]'
                  role='status'
                >
                  <span className='!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]'>
                    Loading...
                  </span>
                </div>
              )}
              {buttonTitle ?? "Continue"}
            </Button>
          </DialogFooter>
        </form>
      </ScrollArea>
    </Form>
  );
};

import { RegisterOptions } from "react-hook-form";

export type CustomFormFieldType = {
  name: string;
  label?: string;
  required?: boolean;
  select?: boolean;
  defaultValue?: string | number | boolean | Date | undefined | any;
  register?: RegisterOptions;
  helperText?: string;
  rows?: number;
  multiline?: boolean;
  type?: string;
  readOnly?: boolean;
  options?: {
    label?: string;
    value?: string | number | boolean;
  }[];
  inputProps?: any;
  placeholder?: string;
};
