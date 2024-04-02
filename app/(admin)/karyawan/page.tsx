import Footer from "@/components/footer";
import { NavbarDashboard } from "@/components/navbar";
import Sidebar from "@/components/sidebar";
import React from "react";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { Metadata } from "next";
import { IKaryawan } from "@/lib/interfaces";
import { BreadcrumbWithSeparator } from "@/components/breadcrumb";

export const metadata: Metadata = {
  title: "AtmaKitchen | Karyawan",
  description: "AtmaKitchen Karyawan Dashboard",
};

async function getData(): Promise<IKaryawan[]> {
  // Fetch data from your API here.
  return [
    {
      id: 1,
      nama: "Albert",
      alamat: "Jln. Babarsari No. 81, Yogyakarta",
      telepon: "08734867348",
      gaji_harian: "100000",
      bonus: "",
      id_role: "2",
    },
    {
      id: 2,
      nama: "Budi Setiawan",
      alamat: "Jln. Babarsari No. 81, Yogyakarta",
      telepon: "08734867348",
      gaji_harian: "150000",
      bonus: "150000",
      id_role: "2",
    },
    {
      id: 3,
      nama: "Cindy Yugoslavia",
      alamat: "Jln. Babarsari No. 81, Yogyakarta",
      telepon: "08734867348",
      gaji_harian: "188000",
      bonus: "",
      id_role: "1",
    },
    {
      id: 4,
      nama: "Gerald",
      alamat: "Jln. Babarsari No. 81, Yogyakarta",
      telepon: "08734867348",
      gaji_harian: "188000",
      bonus: "",
      id_role: "3",
    },
    // ...
  ];
}

export default async function page() {
  const data = await getData();

  return (
    // Boiler template for dashboard
    // Please do not change nor delete it unless you know what you are doing
    <div>
      <div className="flex">
        <Sidebar />

        <div className="flex flex-col w-full">
          <NavbarDashboard title="Karyawan" />
          <div className="w-full px-4 pl-4 lg:pr-16 py-4 space-y-4">
            {/* <div className="border border-slate-500 border-dashed">
              <p>Content</p> */}
            <BreadcrumbWithSeparator currentPage="Karyawan" />
            <DataTable columns={columns} data={data} />
            {/* </div> */}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
