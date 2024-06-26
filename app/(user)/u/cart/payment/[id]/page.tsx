"use client";
import Loading from "@/components/ui/loading";
import { Separator } from "@/components/ui/separator";
import { UserWrapper } from "@/components/user-wrapper";
import { getPesananById } from "@/lib/api/pesanan";
import { useTitle } from "@/lib/hooks";
import { IDetailPesanan } from "@/lib/interfaces";
import { toRupiah, toThousand } from "@/lib/utils";
import React, { useState } from "react";
import PaymentForm from "../_components/input-form";
import { useCurrentUserStore } from "@/lib/state/user-store";
import { uploadPaymentProof } from "../../../../../../lib/api/pesanan";
import { useRouter } from "next/navigation";

export default function page({ params }: { params: { id: string } }) {
  useTitle("AtmaKitchen | Pembayaran");
  const { data, isLoading } = getPesananById(params.id);

  const { currentUser } = useCurrentUserStore();

  const [isUploading, setIsUploading] = useState(false);

  const router = useRouter();
  const uploadBuktiPembayaran = async (values: any) => {
    try {
      setIsUploading(true);

      const response = await uploadPaymentProof(
        currentUser?.id_pelanggan!,
        params.id,
        values.image,
      );

      console.log(response);
      router.push("/u/profile?showing=pesanan");
    } catch (error) {
    } finally {
      setIsUploading(false);
    }
  };
  return (
    <UserWrapper className="flex flex-col gap-4 lg:flex-row">
      {!isLoading ? (
        <div className="flex flex-col items-start gap-4 lg:flex-row">
          <div className="w-full space-y-4 rounded-lg border border-slate-200 p-4 lg:w-1/2 xl:w-1/4">
            <div>
              <div className="flex flex-col items-start gap-1">
                <div className="flex w-full justify-between">
                  <p>Total Belanja </p>
                  <p>{toRupiah(data.total_pesanan)}</p>
                </div>
                {data.detail_pesanan.map(
                  (pesanan: IDetailPesanan, index: number) => (
                    <div
                      className=" ml-4 flex items-center justify-between text-slate-500"
                      key={index}
                    >
                      <p className="text-body">{pesanan.nama_produk} </p>
                      <p className="text-body">
                        {pesanan.jumlah} x {toRupiah(parseInt(pesanan.harga))}
                      </p>
                    </div>
                  ),
                )}
                {data?.pengiriman?.harga && (
                  <div className="flex w-full justify-between">
                    <p>Total Ongkir</p>
                    <p>{toRupiah(data.pengiriman.harga)}</p>
                  </div>
                )}
                {data?.total_diskon_poin && (
                  <div className="flex w-full justify-between">
                    <p>Total Diskon Poin</p>
                    <p className="text-green-600">
                      {toRupiah(-data.total_diskon_poin)}
                    </p>
                  </div>
                )}
              </div>
            </div>
            {data.pengiriman && (
              <div className="flex items-center justify-between">
                <p>Total Ongkir </p>
                <p>{toRupiah(data.pengiriman.harga)}</p>
              </div>
            )}
            <Separator />
            <div className="flex items-center justify-between">
              <p className="text-h4">Total Tagihan </p>
              <p className="text-h4">
                {toRupiah(
                  data.total_setelah_diskon + (data.pengiriman?.harga ?? 0),
                )}
              </p>
            </div>
          </div>
          <PaymentForm
            onSubmit={uploadBuktiPembayaran}
            isLoading={isUploading}
          />
        </div>
      ) : (
        <Loading />
      )}
    </UserWrapper>
  );
}
