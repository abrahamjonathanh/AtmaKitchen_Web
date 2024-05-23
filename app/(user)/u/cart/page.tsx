"use client";
import React, { useEffect, useState } from "react";
import ProductCart from "./_components/product_cart";
import ProductRecommendation from "../../_components/recommendation-product";
import { useTitle } from "@/lib/hooks";
import { UserWrapper } from "@/components/user-wrapper";
import ProductSummaryCard from "./_components/product-summary-card";
import {
  getCartsByCustomerId,
  updateQuantityInCustomerCart,
} from "@/lib/api/pesanan";
import Loading from "@/components/ui/loading";
import { IAlamat, IDetailKeranjang } from "@/lib/interfaces";
import UserAlamatCard from "./_components/user-alamat-card";
import { useCurrentUserStore } from "@/lib/state/user-store";

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
  };

  const onAlamatHandler = (values: IAlamat) => {
    setAlamat(values);
  };

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
          isEditable
          onUpdatePengiriman={onPengirimanHandler}
        />
      </div>
      <ProductRecommendation />
    </UserWrapper>
  );
}
