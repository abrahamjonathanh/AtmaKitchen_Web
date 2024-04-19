"use client";

import { useSWRConfig } from "swr"; // Copy this for create, update, delete
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal, Pencil, Trash2 } from "lucide-react";

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

import { useState } from "react";
import DeleteDialog from "@/components/deleteDialog";
import { usePathname, useRouter } from "next/navigation";
import { IKaryawan } from "@/lib/interfaces";
import { deleteKaryawanById } from "@/lib/api/karyawan";

export const columns: ColumnDef<IKaryawan>[] = [
  {
    accessorKey: "id_karyawan",
    header: () => {
      return <div className="w-10 max-w-16"># ID</div>;
    },
  },
  {
    accessorKey: "nama",
    header: ({ column }) => {
      return (
        <div className="w-auto">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Nama Lengkap
            <ArrowUpDown className="ml-2" size={"12"} />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => (
      <div className="px-4 font-medium w-full line-clamp-2 ">
        {row.getValue("nama")}
      </div>
    ),
  },
  {
    accessorKey: "email",
    accessorFn: (row) => row.akun?.email,
    header: () => <div className="max-w-56 w-auto">Email</div>,
  },
  {
    accessorKey: "alamat",
    header: () => <div className="line-clamp-2 w-auto">Alamat</div>,
    cell: ({ row }) => {
      return (
        <div className="line-clamp-2 max-w-80 w-56">
          {row.getValue("alamat")}
        </div>
      );
    },
  },
  {
    accessorKey: "gaji_harian",
    header: () => <div className="max-w-56 w-auto">Gaji Harian</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("gaji_harian"));

      return <div>{toRupiah(amount)}</div>;
    },
  },
  {
    accessorKey: "bonus",
    header: () => <div className="max-w-56 w-auto">Bonus</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("bonus"));

      return <div>{amount ? toRupiah(amount) : "-"}</div>;
    },
  },
  {
    accessorKey: "role",
    accessorFn: (row) => row.akun?.role.id_role,
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Jabatan
          <ArrowUpDown className="ml-2" size={"12"} />
        </Button>
      );
    },
    cell: ({ row }) => {
      const roleBadges: {
        code: string;
        variant: "lime" | "emerald" | "sky" | "violet" | "fuchsia";
        label: "Owner" | "Manager" | "Admin" | "Customer" | "Driver";
      }[] = [
        { code: "1", variant: "lime", label: "Owner" },
        { code: "2", variant: "emerald", label: "Manager" },
        { code: "3", variant: "sky", label: "Admin" },
        { code: "4", variant: "violet", label: "Customer" },
        { code: "5", variant: "fuchsia", label: "Driver" },
      ];

      const roleBadge = roleBadges.find(
        (badge) => badge.code == row.getValue("role")
      );
      return (
        <div className="px-4">
          <Badge variant={roleBadge?.variant}>{roleBadge?.label}</Badge>
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const pathname = usePathname();
      const [isOpen, setIsOpen] = useState(false);
      const { mutate } = useSWRConfig(); // // Copy this for create, update, delete
      const router = useRouter(); // // Copy this for create, update, delete
      const [isLoading, setIsLoading] = useState(false); // // Copy this for create, update, delete

      const onDeleteHandler = async () => {
        try {
          setIsLoading(true);

          const response = await deleteKaryawanById(
            row.getValue("id_karyawan")
          );

          // Auto refresh data when success.
          if (response?.status == 200 || response?.status == 201) {
            mutate("/karyawan"); // For auto refresh
          }
        } catch (error: any) {
          console.error("Error deleting karyawan: " + error);
        } finally {
          setIsLoading(false); //For stop the loading process
          setIsOpen(false); // For close the dialog
        }
      };

      return (
        <>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              {/* <Link href={`${pathname}/${row.getValue("id_karyawan")}`}> */}
              <DropdownMenuItem
                onClick={() =>
                  router.push(`${pathname}/${row.getValue("id_karyawan")}`)
                }
              >
                <Pencil size={"16"} /> Ubah
              </DropdownMenuItem>
              {/* </Link> */}
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setIsOpen(true)}>
                <Trash2 size={"16"} /> Hapus
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <DeleteDialog
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            title={row.getValue("nama")}
            description="Tindakkan ini tidak dapat diulang ketika anda menekan Hapus."
            onSubmit={onDeleteHandler}
            isLoading={isLoading}
          />
        </>
      );
    },
    header: () => {
      return <div className="w-10 max-w-10"></div>;
    },
  },
];
