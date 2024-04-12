"use client";
import UserWrapper from "@/components/user-wrapper";
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
import { useSearchParams } from "next/navigation";
import { useTitle } from "@/lib/hooks";

export default function page() {
  useTitle("AtmaKitchen | Profile");
  const params = useSearchParams();
  const showingPesanan = params.get("showing");

  const defaultValuesToShow = params.get("showing") ?? "biodata";
  console.log(defaultValuesToShow, showingPesanan);

  return (
    <Suspense>
      <UserWrapper className="flex flex-col lg:flex-row gap-4">
        <div className="border border-slate-200 p-4 rounded-lg lg:w-1/3 space-y-4 w-full h-max">
          <div className="flex gap-4 items-center">
            <Image
              src={Default}
              alt="Default"
              className="max-w-20 border rounded-full border-slate-200 object-cover"
            />
            <div className="space-y-0 w-full">
              <p className="text-h4">John Petra</p>
              <p className="text-slate-500">johnpetra@gmail.com</p>
            </div>
          </div>
          <Alert className="bg-yellow-50 text-yellow-600 border-yellow-600">
            <Terminal className="h-4 w-4 " color="#ca8a04" />
            <AlertTitle>Penting!</AlertTitle>
            <AlertDescription className="text-body">
              Saldo refund hanya dapat ditarik dan tidak dapat digunakan untuk
              transaksi.{" "}
            </AlertDescription>
          </Alert>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="flex gap-2 items-center text-slate-500">
                <Wallet2 />
                <p>Saldo Refund</p>
              </span>
              <p className="font-medium">{toRupiah(1500000)}</p>
            </div>
            <div className="flex justify-between items-start">
              <span className="flex gap-2 items-start text-slate-500">
                <Coins />
                <span className="space-y-0">
                  <p>AtmaKitchen Poin</p>
                  <p className="text-xs">1 Poin = {toRupiah(100)}</p>
                </span>
              </span>
              <p className="font-medium">{toThousand(8192)} Poin</p>
            </div>
          </div>
          <Separator />
          <Link
            href={""}
            className={cn(
              buttonVariants({ variant: "default", className: "w-full" })
            )}
          >
            Tarik Saldo
          </Link>
        </div>
        <div className="border border-slate-200 p-4 rounded-lg lg:w-2/3 w-full">
          <Tabs defaultValue={defaultValuesToShow} className="w-full space-y-6">
            <TabsList>
              <TabsTrigger value="biodata">Biodata Diri</TabsTrigger>
              <TabsTrigger value="alamat">Alamat</TabsTrigger>
              <TabsTrigger value="pesanan">Pesanan</TabsTrigger>
            </TabsList>
            <TabsContent value="biodata">
              <BiodataCard />
            </TabsContent>
            <TabsContent value="alamat">
              <Alamat />
            </TabsContent>
            <TabsContent value="pesanan">
              <UserHistory />
            </TabsContent>
          </Tabs>
        </div>
      </UserWrapper>
    </Suspense>
  );
}
