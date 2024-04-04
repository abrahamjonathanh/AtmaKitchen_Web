import { BreadcrumbWithSeparator } from "@/components/breadcrumb";
import DashboardWrapper from "@/components/dashboard-wrapper";
import React from "react";
import JarakKirimForm from "../_components/input-form";
import { IJarakKirim } from "@/lib/interfaces";

export default function page() {
  const data: IJarakKirim = {
    id: "1",
    nama: "John Petra",
    alamat: {
      id: "1",
      nama: "Rumah Utama",
      alamat: "Jln. Babarsari No. 1, Depok, Kabupaten Sleman, D.I. Yogyakarta",
      telepon: "08112352142",
    },
    status: "Menunggu",
  };
  return (
    <DashboardWrapper navTitle="Atur Jarak Kirim">
      <BreadcrumbWithSeparator
        currentPage="Atur"
        previousPage={[{ title: "Jarak Kirim", link: "/jarak-kirim" }]}
      />
      <JarakKirimForm isEditable data={data} />
    </DashboardWrapper>
  );
}
