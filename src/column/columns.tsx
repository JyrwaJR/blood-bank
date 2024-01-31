import { ColumnDef } from "@tanstack/react-table";
import { RequestModelType } from "../models/request-model";

export const RequestColumns: ColumnDef<RequestModelType>[] = [
  {
    header: "ID",
    accessorKey: "id",
  },
  {
    header: "Pick up date",
    accessorKey: "pick_up_date",
  },
  {
    header: "Is Approve",
    accessorKey: "is_approve",
  },
  {
    header: "Blood Group",
    accessorKey: "blood_group",
  },
  {
    header: "Request Date",
    accessorKey: "request_date",
  },
  {
    header: "Created At",
    accessorKey: "created_at",
  },
  {
    header: "Updated At",
    accessorKey: "updatedAt",
  },
];
