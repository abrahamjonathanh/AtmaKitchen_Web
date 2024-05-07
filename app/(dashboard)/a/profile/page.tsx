"use client";

import DashboardWrapper from "@/components/dashboard-wrapper";

import AdminProfileForm from "./_components/input-form";
import { useState } from "react";
import { deleteKaryawanById, updateKaryawanProfile } from "@/lib/api/karyawan";
import { IProfileAdmin } from "@/lib/interfaces";
import AdminProfileInfo from "./_components/profile-info";
import { BreadcrumbWithSeparator } from "@/components/breadcrumb";
import { useTitle } from "@/lib/hooks";
import { getCurrentUser } from "@/lib/api/auth";
import Loading from "@/components/ui/loading";

export default function page() {
  useTitle("AtmaKitchen | Profil");
  const profile = getCurrentUser();

  const [isLoading, setIsLoading] = useState(false);

  const onUpdateHandler = async (values: any) => {
    try {
      setIsLoading(true);
      console.log(profile.data);
      console.log(values);
      const profileData = profile.data;

      const response = await updateKaryawanProfile({
        ...values,
        id_akun: profileData.akun?.id_akun,
      });

      if (response?.status === 200 || response?.status === 201) {
        profile.mutate();
      }
    } catch (error: any) {
      console.error("Error updating profil: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <DashboardWrapper navTitle="Profil">
      <BreadcrumbWithSeparator currentPage="Profil" />
      {profile.data && !profile.isLoading && !profile.isValidating ? (
        <div className="max-w-[1200px]">
          <AdminProfileInfo data={profile.data} />
          <AdminProfileForm
            data={profile.data}
            isLoading={isLoading}
            onSubmit={onUpdateHandler}
          />
        </div>
      ) : (
        <Loading />
      )}
    </DashboardWrapper>
  );
}
