import Footer from "@/components/footer";
import { NavbarDashboard } from "@/components/navbar";
import Sidebar from "@/components/sidebar";
import React from "react";
import { Promo, columns } from "./columns";
import { DataTable } from "./data-table";

async function getData(): Promise<Promo[]> {
  // Fetch data from your API here.
  return [
    {
      id: 1,
      promo: "Promo-1",
      minimum: 10000,
      poin: 1,
      status: "Aktif",
    },
    {
      id: 2,
      promo: "Promo-2",
      minimum: 100000,
      poin: 15,
      status: "Aktif",
    },
    {
      id: 3,
      promo: "Promo-3",
      minimum: 500000,
      poin: 75,
      status: "Aktif",
    },
    {
      id: 4,
      promo: "Promo-4",
      minimum: 1000000,
      poin: 200,
      status: "Tidak aktif",
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
          <NavbarDashboard title="Promo" />
          <div className="w-full px-4 pl-4 lg:pr-16 py-4">
            {/* <div className="border border-slate-500 border-dashed">
              <p>Content</p> */}

            <DataTable columns={columns} data={data} />
            {/* </div> */}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
