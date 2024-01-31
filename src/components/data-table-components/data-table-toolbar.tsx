"use client";

import { Cross2Icon, PlusCircledIcon, ReloadIcon } from "@radix-ui/react-icons";
import { Table } from "@tanstack/react-table";

import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { DataTableViewOptions } from "./data-table-view-options";
import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";
interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  refetch?: () => void;
  addButton?: () => void;
  buttonTitle?: string;
  searches?: {
    label: string;
    value: string;
  }[];
}

export function DataTableToolbar<TData>({
  table,
  searches = searchByItems,
  addButton,
  buttonTitle,
  refetch,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;
  const [isSearchBy, setIsSearchBy] = useState<string>(searches[0].value);

  return (
    <div className='flex items-center justify-between'>
      <div className='flex flex-1 items-center space-x-2'>
        <Input
          placeholder='Filter'
          value={table.getColumn(isSearchBy)?.getFilterValue() as string}
          onChange={(event) =>
            table.getColumn(isSearchBy)?.setFilterValue(event.target.value)
          }
          className='h-8 w-[150px] lg:w-[250px]'
        />
        <Select
          onValueChange={(value) => setIsSearchBy(value)}
          defaultValue={isSearchBy}
        >
          <SelectTrigger className='hidden md:flex h-8 max-w-[200px]'>
            <SelectValue placeholder='Search' />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {searches.map((item, i) => (
                <React.Fragment key={i}>
                  <SelectItem value={item.value}>{item.label}</SelectItem>
                </React.Fragment>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        {isFiltered && (
          <Button
            variant='ghost'
            onClick={() => table.resetColumnFilters()}
            className='h-8 px-2 lg:px-3 hidden md:flex'
          >
            Reset
            <Cross2Icon className='ml-2 h-4 w-4' />
          </Button>
        )}
      </div>
      <div className='flex items-center space-x-4'>
        <div className='flex space-x-2'>
          <div className='hidden md:flex'>
            {refetch && (
              <Button
                onClick={refetch}
                className='h-8 px-2 lg:px-3'
                variant={"outline"}
              >
                Refresh
                <ReloadIcon className='ml-2 h-4 w-4' />
              </Button>
            )}
          </div>
          <div>
            {addButton && (
              <Button
                variant={"outline"}
                className='h-8 px-2 lg:px-3'
                onClick={addButton}
              >
                {buttonTitle ?? "Add Member"}
                <PlusCircledIcon className='ml-2 h-4 w-4' />
              </Button>
            )}
          </div>
        </div>
        <DataTableViewOptions table={table} />
      </div>
    </div>
  );
}
const searchByItems = [
  {
    value: "kyrteng",
    label: "Kyrteng",
  },
  {
    value: "deiKhliehKaIng",
    label: "Dei Khlieh Ka Ing",
  },
  {
    value: "kyrtengKhliehKaIng",
    label: "Kyrteng Khlieh Ka Ing",
  },
  {
    value: "kyrtengKmie",
    label: "Kyrteng Kmie",
  },
  {
    value: "kyrtengKpa",
    label: "Kyrteng Kpa",
  },
  {
    value: "tarikSngiKha",
    label: "Tarik Sngi Kha",
  },
  {
    value: "gender",
    label: "Gender",
  },
  {
    value: "jingiadeiBadKhliehIng",
    label: "Jing Ia dei",
  },
  {
    value: "mobileNo",
    label: "Mobile No.",
  },
  {
    value: "niam",
    label: "Niam",
  },
  {
    value: "jakaSah",
    label: "Jaka Sah.",
  },
];
