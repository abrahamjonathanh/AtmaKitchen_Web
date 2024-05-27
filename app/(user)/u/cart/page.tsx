"use client";
import React, { useEffect, useState } from "react";
import ProductCart from "./_components/product_cart";
import ProductRecommendation from "../../_components/recommendation-product";
import { useTitle } from "@/lib/hooks";
import { UserWrapper } from "@/components/user-wrapper";
import ProductSummaryCard from "./_components/product-summary-card";
import {
  createPesanan,
  getCartsByCustomerId,
  updateQuantityInCustomerCart,
} from "@/lib/api/pesanan";
import Loading from "@/components/ui/loading";
import { IAlamat, IDetailKeranjang, IHampers, IProduk } from "@/lib/interfaces";
import UserAlamatCard from "./_components/user-alamat-card";
import { useCurrentUserStore } from "@/lib/state/user-store";
import { addDays } from "date-fns";
import { deleteAllDetailKeranjangByIdPelanggan } from "@/lib/api/keranjang";

export default function page() {
  useTitle("AtmaKitchen | Keranjang");
  const [isLoading, setIsLoading] = useState(false);
  const [isAddingAlamat, setIsAddingAlamat] = useState(false);
  const [alamat, setAlamat] = useState<IAlamat | null>(null);
  const { currentUser } = useCurrentUserStore();

  const customerCart = getCartsByCustomerId(
    parseInt(currentUser?.id_pelanggan ?? "1"),
  );

  const updateQuantityInCustomerCartHandler = async ({
    newQuantity,
    idProduk,
    idDetailKeranjang,
  }: {
    newQuantity: number;
    idProduk: number;
    idDetailKeranjang: number;
  }) => {
    try {
      setIsLoading(true);
      console.log(customerCart.data.id_keranjang, newQuantity, idProduk);
      const response = await updateQuantityInCustomerCart(idDetailKeranjang, {
        id_produk: idProduk,
        jumlah: newQuantity,
      });
      customerCart.mutate();
      console.log(response);
    } catch (error: any) {
      console.error(error.response?.data?.message);
    } finally {
      setIsLoading(false);
    }
  };

  const onPengirimanHandler = (values: boolean) => {
    setIsAddingAlamat(values);
    console.log(isAddingAlamat);
  };

  const onAlamatHandler = (values: IAlamat) => {
    setAlamat(values);
  };

  const onSubmitHandler = (values: any) => {
    isAddingAlamat ? alamat : setAlamat(null);
    const produk: (IProduk & { jumlah: number })[] = [];
    const produk_hampers: (IHampers & { jumlah: number })[] = [];

    customerCart.data.detail_keranjang.forEach((item: any) => {
      if (item.hampers === null) {
        produk.push({ ...item.produk, jumlah: item.jumlah });
      } else if (item.produk === null) {
        produk_hampers.push({ ...item.hampers, jumlah: item.jumlah });
      }
    });

    const data = {
      id_metode_pembayaran: values.id_metode_pembayaran,
      id_pelanggan: currentUser?.id_pelanggan,
      tgl_order: addDays(new Date(values.dob), 1).toISOString().split("T")[0],
      total_diskon_poin: values.poin ? values.poin : 0,
      jenis_pengiriman: values.pengiriman,
      nama: alamat?.nama,
      telepon: alamat?.telepon,
      alamat: alamat?.alamat,
      produk: produk.length > 0 ? produk : null,
      produk_hampers: produk_hampers.length > 0 ? produk_hampers : null,
    };

    if (produk.length > 0 || produk_hampers.length > 0) {
      // console.log(data);
      createPesanan(data);
      deleteAllDetailKeranjangByIdPelanggan(currentUser?.id_pelanggan!);
    }
  };

  const calculateTotalHarga = () => {
    let totalHarga = 0;
    !customerCart.isLoading &&
      customerCart.data.detail_keranjang &&
      customerCart.data.detail_keranjang.forEach((item: any) => {
        if (item.hampers === null) {
          totalHarga += item.produk.harga_jual * item.jumlah;
        } else if (item.produk === null) {
          totalHarga += item.hampers.harga_jual * item.jumlah;
        }
      });
    return totalHarga;
  };

  const totalHarga = calculateTotalHarga();

  useEffect(() => {
    if (alamat) {
      console.log(alamat);
    }
  }, [alamat]);

  return (
    <UserWrapper className="space-y-8 bg-slate-50">
      <div className="flex flex-col-reverse gap-4 lg:flex-row">
        <div className="relative space-y-8 lg:w-2/3">
          {isAddingAlamat && (
            <UserAlamatCard onAlamatHandler={onAlamatHandler} />
          )}
          <div className="space-y-4">
            {/* TODO: Update keranjang API harusnya 1 orang cuman ada 1 keranjang */}
            {!customerCart.isLoading &&
            !customerCart.error &&
            !customerCart.isValidating &&
            customerCart.data ? (
              <>
                <p className="text-h4">
                  Keranjang ({customerCart.data.detail_keranjang.length})
                </p>
                <div>
                  {/* Cart list */}
                  <div className="space-y-2">
                    {customerCart.data.detail_keranjang.map(
                      (data: IDetailKeranjang, index: number) => (
                        <ProductCart
                          key={index}
                          data={data}
                          onRefresh={updateQuantityInCustomerCartHandler}
                          isLoading={isLoading}
                          onReload={customerCart.mutate}
                        />
                      ),
                    )}
                  </div>
                </div>
              </>
            ) : (
              <Loading />
            )}
          </div>
        </div>
        {/* Pricing */}
        <ProductSummaryCard
          totalHarga={totalHarga}
          isEditable
          onUpdatePengiriman={onPengirimanHandler}
          onSubmit={onSubmitHandler}
        />
      </div>
      <ProductRecommendation />
    </UserWrapper>
  );
}
