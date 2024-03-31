"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toRupiah } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Promo = {
  id: number;
  promo: string;
  minimum: number;
  poin: number;
  status: "Aktif" | "Tidak aktif";
};

export const columns: ColumnDef<Promo>[] = [
  {
    accessorKey: "id",
    header: "# ID",
  },
  {
    accessorKey: "promo",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Nama Promo
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="px-4 font-medium">{row.getValue("promo")}</div>
    ),
  },
  {
    accessorKey: "minimum",
    header: () => <div>Minimum Transaksi</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("minimum"));

      return <div>{toRupiah(amount)}</div>;
    },
  },
  {
    accessorKey: "poin",
    header: () => <div>Perolehan Poin</div>,
    cell: ({ row }) => <div>{row.getValue("poin")} Poin</div>,
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Status
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="px-4">
        <Badge
          variant={row.getValue("status") == "Aktif" ? "success" : "failed"}
        >
          {row.getValue("status")}
        </Badge>
      </div>
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const promo = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(promo.id.toString())}
            >
              Copy Promo ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View customer</DropdownMenuItem>
            <DropdownMenuItem>View Promo details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
