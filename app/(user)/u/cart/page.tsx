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
import { toast } from "sonner";
import { getCurrentUserWithToken } from "@/lib/api/auth";
import Cookies from "js-cookie";

export default function page() {
  useTitle("AtmaKitchen | Keranjang");
  const [isLoading, setIsLoading] = useState(false);
  const [isAddingAlamat, setIsAddingAlamat] = useState(false);
  const [alamat, setAlamat] = useState<IAlamat | null>(null);
  const [dob, setDob] = useState(new Date());
  const { currentUser, refresh } = useCurrentUserStore();

  const dobDate = new Date(dob);
  dobDate.setDate(dobDate.getDate() + 1);

  const onPengirimanHandler = (values: boolean) => {
    setIsAddingAlamat(values);
  };

  const onAlamatHandler = (values: IAlamat) => {
    setAlamat(values);
  };

  const onDobHandler = (values: any) => {
    setDob(values);
  };

  /**
   * Retrieves the customer's cart based on the customer ID and date of birth.
   *
   * @param {number} customerId - The ID of the customer.
   * @param {string} dob - The date of birth of the customer in ISO format (YYYY-MM-DD).
   * @returns {Cart[]} - An array of cart items belonging to the customer.
   */
  const customerCart = getCartsByCustomerId(
    parseInt(currentUser?.id_pelanggan ?? "1"),
    dobDate.toISOString().split("T")[0],
  );

  /**
   * Updates the quantity of a product in the customer's cart.
   *
   * @param {Object} params - The parameters for updating the quantity.
   * @param {number} params.newQuantity - The new quantity of the product.
   * @param {number} params.idProduk - The ID of the product.
   * @param {number} params.idDetailKeranjang - The ID of the cart detail.
   */
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
      console.error(error);
      console.error(error.response?.data?.message);
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Handles the form submission event.
   * @param values - The form values.
   */
  const onSubmitHandler = async (values: any) => {
    isAddingAlamat ? alamat : setAlamat(null);
    const produk: (IProduk & { jumlah: number })[] = [];
    const produk_hampers: (IHampers & { jumlah: number })[] = [];
    let isReadyStock = true;

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
      customerCart.data.detail_keranjang.forEach((item: any) => {
        if (item.ready_stock == 0) {
          isReadyStock = false;
          return;
        }
      });
      if (isReadyStock) {
        const response = await createPesanan(data);

        if (response?.status === 200 || response?.status === 201) {
          const token = Cookies.get("token");
          const user = await getCurrentUserWithToken(token!);
          refresh(user?.data.data);
        }
      } else toast.warning("Stok produk tidak cukup");
      customerCart.mutate();
    } else {
      toast.warning("Keranjang masih kosong");
    }
  };

  /**
   * Calculates the total price of items in the customer's cart.
   * @returns The total price of items in the cart.
   */
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
            ) : !customerCart.data ? (
              <p>Data keranjang tidak tersedia!</p>
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
          onUpdateDob={onDobHandler}
          onSubmit={onSubmitHandler}
        />
      </div>
      <ProductRecommendation />
    </UserWrapper>
  );
}
