import { BreadcrumbWithSeparator } from "@/components/breadcrumb";
import DashboardWrapper from "@/components/dashboard-wrapper";
import { IBahanBaku } from "@/lib/interfaces";
import { DataTable } from "./data-table";
import { columns } from "./columns";

// function getStatus(stok: number, stok_minimum: number): string {
//   if (stok <= 0) {
//     return "Habis";
//   } else if (stok < stok_minimum) {
//     return "Akan Habis";
//   } else {
//     return "Mencukupi";
//   }
// }

async function getData(): Promise<IBahanBaku[]> {
  const data: IBahanBaku[] = [
    {
      id: 1,
      nama: "Tepung Terigu",
      stok: "100",
      stok_minimum: "10",
      satuan: "kg",
      updated_at: "2024-04-04T10:00:00Z",
    },
    {
      id: 2,
      nama: "Gula",
      stok: "5",
      stok_minimum: "10",
      satuan: "kg",
      updated_at: "2024-04-03T15:30:00Z",
    },
    {
      id: 3,
      nama: "Susu",
      stok: "0",
      stok_minimum: "10",
      satuan: "liter",
      updated_at: "2024-04-02T11:45:00Z",
    },
  ];
  return data;

  // const dataWithStatus = data.map((item) => ({
  //   ...item,
  //   status: getStatus(item.stok, item.stok_minimum),
  // }));

  // return dataWithStatus;
}
export default async function page() {
  const data = await getData();

  return (
    <DashboardWrapper navTitle="Bahan Baku">
      <BreadcrumbWithSeparator currentPage="Bahan Baku" />
      <DataTable data={data} columns={columns} />
    </DashboardWrapper>
  );
}
