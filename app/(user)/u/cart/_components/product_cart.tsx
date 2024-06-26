"use client";
import { Button } from "@/components/ui/button";
import { toRupiah } from "@/lib/utils";
import Image from "next/image";
import { Minus, Plus, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import Loading from "@/components/ui/loading";
import { IDetailKeranjang } from "@/lib/interfaces";
import { deleteDetailKeranjangById } from "@/lib/api/keranjang";
import ConfirmDialog from "@/components/confirmDialog";
import { useState } from "react";
import Cookies from "js-cookie";
import { getCurrentUserWithToken } from "@/lib/api/auth";
import { useCurrentUserStore } from "@/lib/state/user-store";
import NotAvailable from "@/public/products/Not Available.png";
export default function ProductCart({
  data,
  onRefresh,
  isLoading = false,
  onReload,
}: {
  data: IDetailKeranjang;
  onRefresh?: ({
    newQuantity,
    idProduk,
    idDetailKeranjang,
  }: {
    newQuantity: number;
    idProduk: number;
    idDetailKeranjang: number;
  }) => void;
  isLoading: boolean;
  onReload?: () => void;
}) {
  const { refresh } = useCurrentUserStore();
  const [isDeleting, setIsDeleting] = useState(false);

  const onQuantityChange = async (value: number) => {
    try {
      const newQuantity = Math.max(1, data.jumlah + value);

      onRefresh!({
        newQuantity,
        idProduk: parseInt(data.produk?.id_produk!),
        idDetailKeranjang: parseInt(data.id_detail_keranjang),
      });
    } catch (error: any) {
      console.error(error.response?.data?.message);
    } finally {
    }
  };

  const onDeleteButtonClick = async () => {
    try {
      setIsDeleting(true);
      const response = await deleteDetailKeranjangById(
        parseInt(data.id_detail_keranjang),
      );

      if (response?.status === 200 || response?.status === 201) {
        const token = Cookies.get("token");
        const user = await getCurrentUserWithToken(token!);
        refresh(user?.data.data);
        onReload!();
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="flex w-full gap-3.5 rounded-lg border border-slate-200 bg-white p-4 ">
      <Image
        src={
          data.produk
            ? data.produk?.thumbnail?.image ?? NotAvailable
            : data.hampers?.image ?? NotAvailable
        }
        alt="Brownies"
        className="aspect-square max-w-20 rounded object-cover"
        width={240}
        height={240}
      />
      <div className="flex w-full flex-col gap-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="overflow line-clamp-1 font-medium">
              {data.produk ? data.produk?.nama : data.hampers?.nama}{" "}
              {data.produk ? data.produk?.ukuran : ""}
            </p>
            <p>Stok: {data.ready_stock}</p>
          </div>

          <p className="text-large">
            {data.produk?.harga_jual
              ? toRupiah(parseInt(data.produk.harga_jual.toString()))
              : data.hampers?.harga_jual
                ? toRupiah(parseInt(data.hampers.harga_jual.toString()))
                : "N/A"}
          </p>
        </div>
        <div className="flex w-full items-center justify-end gap-4">
          <ConfirmDialog
            onSubmit={onDeleteButtonClick}
            title={`Hapus ${data.produk ? data.produk?.nama : data.hampers?.nama} dari keranjang`}
            isLoading={isDeleting}
            submitTitle="Hapus"
          >
            <Button variant={"ghost"} className="text-slate-500">
              <Trash2 size={"16"} />
            </Button>
          </ConfirmDialog>

          <div className="flex items-center gap-0">
            <Button
              variant={"ghost"}
              size={"sm"}
              onClick={() => onQuantityChange(-1)}
              disabled={isLoading}
              className="hover:bg-transparent"
            >
              {isLoading ? <Loading iconOnly /> : <Minus size={"16"} />}
            </Button>
            <Input
              type="number"
              defaultValue={data.jumlah}
              className="h-8 max-w-14 overflow-x-hidden text-black"
            />
            <Button
              variant={"ghost"}
              size={"sm"}
              onClick={() => onQuantityChange(1)}
              disabled={isLoading}
              className="hover:bg-transparent"
            >
              {isLoading ? <Loading iconOnly /> : <Plus size={"16"} />}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
