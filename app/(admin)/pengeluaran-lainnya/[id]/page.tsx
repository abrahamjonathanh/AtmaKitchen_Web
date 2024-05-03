"use client";
import { useSWRConfig } from "swr";
import React, { useState } from "react";
import PengeluaranLainnyaForm from "../_components/input-form";
import { useTitle } from "@/lib/hooks";
import { IPengeluaranLainnya } from "@/lib/interfaces";
import {
  getPengeluaranLainnyaById,
  updatePengeluaranLainnyaById,
} from "@/lib/api/pengeluaranlainnya";
import { BreadcrumbWithSeparator } from "@/components/breadcrumb";
import DashboardWrapper from "@/components/dashboard-wrapper";
import { useRouter } from "next/navigation";
import Loading from "@/components/ui/loading";

export default function page({ params }: { params: { id: number } }) {
  useTitle("AtmaKitchen | Pengeluaran Lainnya");
  const { mutate } = useSWRConfig(); // // Copy this for create, update, delete
  const router = useRouter(); // // Copy this for create, update, delete
  const [isLoading, setIsLoading] = useState(false);

  const { data, isValidating } = getPengeluaranLainnyaById(params.id); // Copy this only for update or delete screen to get data by id

  const onUpdateHandler = async (values: any) => {
    try {
      setIsLoading(true);
      const response = await updatePengeluaranLainnyaById(params.id, values);
    } catch (error: any) {
      console.error("Error updating pengeluaran lainnya: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <DashboardWrapper navTitle="Ubah pengeluaran lainnya">
      <BreadcrumbWithSeparator
        previousPage={[
          { title: "Pengeluaran Lainnya", link: "/pengeluaran-lainnya" },
        ]}
        currentPage="Ubah"
      />

      {data && !isValidating ? (
        <PengeluaranLainnyaForm
          isEditable
          data={data}
          onSubmit={onUpdateHandler}
          isLoading={isLoading}
        />
      ) : (
        <Loading />
      )}
    </DashboardWrapper>
  );
}

//       <PengeluaranLainnyaForm
//         isEditable
//         data={{
//           id_pengeluaran_lainnya: params.id,
//           nama: "listrik",
//           biaya: "1000",
//           tanggal: "2024-04-13",
//           kategori: "Pengeluaran",
//           karyawan: {
//             id_karyawan: 1,
//             nama: "Linda",
//             alamat: "Jl. Anggur",
//             telepon: "0812346788",
//             gaji_harian: "70000",
//             id_role: "1",
//             akun: {
//               id_akun: "1",
//               role: {
//                 id_role: "1",
//                 role: "Admin",
//               },
//             },
//           },
//         }}
//         onSubmit={onUpdateHandler}
//         isLoading={isLoading}
//       />
//     </DashboardWrapper>
//   );
// }
