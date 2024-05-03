"use client";

import DashboardWrapper from "@/components/dashboard-wrapper";

import AdminProfileForm from "./_components/input-form";
import { useState } from "react";
import { deleteKaryawanById } from "@/lib/api/karyawan";
import { IProfileAdmin } from "@/lib/interfaces";
import AdminProfileInfo from "./_components/profile-info";
import { BreadcrumbWithSeparator } from "@/components/breadcrumb";
import { useTitle } from "@/lib/hooks";

export default function page() {
  useTitle("AtmaKitchen | Profil");
  const [isLoading, setIsLoading] = useState(false);

  const data: IProfileAdmin = {
    id: "1",
    nama: "John Petra",
    alamat: "Jln. Kaliurang 215",
    email: "john.petra@gmail.com",
    telepon: "085612852715",
    password: "",
    confirmPassword: "",
  };

  const onUpdateHandler = async (values: IProfileAdmin) => {
    try {
      setIsLoading(true);
      console.log(values);
      await deleteKaryawanById(1); // Change this to handler
    } catch (error: any) {
      console.error("Error updating profil: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <DashboardWrapper navTitle="Profil">
      <BreadcrumbWithSeparator currentPage="Profil" />
      <div className="max-w-[1200px]">
        <AdminProfileInfo />

        <AdminProfileForm
          data={data}
          isLoading={isLoading}
          onSubmit={onUpdateHandler}
        />
      </div>
    </DashboardWrapper>
  );
}
