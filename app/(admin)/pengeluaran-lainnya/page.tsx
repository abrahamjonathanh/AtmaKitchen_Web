import React from "react";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { IPengeluaranLainnya } from "@/lib/interfaces";
import { BreadcrumbWithSeparator } from "@/components/breadcrumb";
import DashboardWrapper from "@/components/dashboard-wrapper";
import { getAllPengeluaranLainnya } from "@/lib/api/pengeluaranlainnya";


async function getData(): Promise<IPengeluaranLainnya[]> {
  // Dummy data for pengeluaran lainnya
  return [
    {
      id_pengeluaran_lainnya: 1,
      nama: "listrik",
      tanggal: "2024-04-12",
      kategori: "1",
      biaya: "500000",
      karyawan: {
        id_karyawan: 1,
        nama: "Sasa",
        alamat: "Jl. Anggur",
        gaji_harian: "70000",
        telepon: "0812345678",
        akun: { role: { id_role: "1", role: "Admin" } },
      },
    },
    {
      id_pengeluaran_lainnya: 2,
      nama: "izin",
      tanggal: "2024-04-10",
      kategori: "2",
      biaya: "1000000",
      karyawan: {
        id_karyawan: 2,
        nama: "Sisi",
        alamat: "Jl. Buaya",
        gaji_harian: "60000",
        telepon: "084567854",
        akun: { role: { id_role: "2", role: "Manager" } },
      },
    },
  ];
}

export default async function Page() {
  // Turn on this when you're offline from the database server
  const data = await getData();

  return (
    // Dashboard boilerplate template
    // Please do not change or delete it unless you know what you are doing
    <DashboardWrapper navTitle="Pengeluaran Lainnya">
      <BreadcrumbWithSeparator currentPage="Pengeluaran Lainnya" />
      <DataTable columns={columns} data={data} />
    </DashboardWrapper>
  );
}
