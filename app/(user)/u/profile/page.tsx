"use client";
import Image from "next/image";
import React, { Suspense } from "react";
import Default from "@/public/avatars/Default.png";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Coins, Terminal, Wallet2 } from "lucide-react";
import { cn, toRupiah, toThousand } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BiodataCard from "./_components/biodata_card";
import Alamat from "./_components/alamat";
import UserHistory from "./_components/history";
import { useTitle } from "@/lib/hooks";
import { UserWrapper } from "@/components/user-wrapper";
import { useSearchParams } from "next/navigation";
import { getCurrentUser } from "@/lib/api/auth";
import Loading from "@/components/ui/loading";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const ProfileTabs = () => {
  const params = useSearchParams();
  const defaultValuesToShow = params.get("showing") ?? "biodata";

  const { data, isLoading } = getCurrentUser();

  return (
    <Tabs defaultValue={defaultValuesToShow} className="w-full space-y-6">
      <TabsList>
        <TabsTrigger value="biodata">Biodata Diri</TabsTrigger>
        <TabsTrigger value="alamat">Alamat</TabsTrigger>
        <TabsTrigger value="pesanan">Pesanan</TabsTrigger>
      </TabsList>
      <TabsContent value="biodata">
        {!isLoading ? <BiodataCard data={data} /> : <Loading />}
      </TabsContent>
      <TabsContent value="alamat">
        <Alamat />
      </TabsContent>
      <TabsContent value="pesanan">
        {!isLoading ? <UserHistory id_user={data.id_pelanggan} /> : <Loading />}
      </TabsContent>
    </Tabs>
  );
};

export default function Page() {
  useTitle("AtmaKitchen | Profile");
  const { data, isLoading } = getCurrentUser();

  return (
    <UserWrapper className="flex flex-col gap-4 lg:flex-row">
      <div className="h-max w-full space-y-4 rounded-lg border border-slate-200 p-4 lg:w-1/3">
        {!isLoading && data ? (
          <>
            <div className="flex items-center gap-4">
              <Avatar className="h-20 w-20">
                <AvatarImage
                  src={data.akun?.profile_image}
                  className="rounded-full border border-slate-200"
                />
                <AvatarFallback>AK</AvatarFallback>
              </Avatar>
              <div className="w-full space-y-0">
                <p className="text-h4">{data.nama}</p>
                <p className="text-slate-500">{data.akun.email}</p>
              </div>
            </div>
            <Alert className="border-yellow-600 bg-yellow-50 text-yellow-600">
              <Terminal className="h-4 w-4 " color="#ca8a04" />
              <AlertTitle>Penting!</AlertTitle>
              <AlertDescription className="text-body">
                Saldo refund hanya dapat ditarik dan tidak dapat digunakan untuk
                transaksi.
              </AlertDescription>
            </Alert>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-slate-500">
                  <Wallet2 />
                  <p>Saldo Refund</p>
                </span>
                <p className="font-medium">{toRupiah(1500000)}</p>
              </div>
              <div className="flex items-start justify-between">
                <span className="flex items-start gap-2 text-slate-500">
                  <Coins />
                  <span className="space-y-0">
                    <p>AtmaKitchen Poin</p>
                    <p className="text-xs">1 Poin = {toRupiah(100)}</p>
                  </span>
                </span>
                <p className="font-medium">
                  {toThousand(data.poins.total_poin)} Poin
                </p>
              </div>
            </div>
            <Separator />
            <Link
              href={""}
              className={cn(
                buttonVariants({ variant: "default", className: "w-full" }),
              )}
            >
              Tarik Saldo
            </Link>
          </>
        ) : (
          <Loading />
        )}
      </div>

      <div className="w-full rounded-lg border border-slate-200 p-4 lg:w-2/3">
        <Suspense>
          <ProfileTabs />
        </Suspense>
      </div>
    </UserWrapper>
  );
}
