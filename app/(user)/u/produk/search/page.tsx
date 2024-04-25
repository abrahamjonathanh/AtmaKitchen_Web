"use client";
import { UserProductWrapper } from "@/components/user-wrapper";
import { useSearchParams } from "next/navigation";
import React, { Suspense } from "react";
import ProdukList from "../_components/produk-list";
import Loading from "@/components/ui/loading";

function ProductList() {
  const search = useSearchParams();
  const searchQuery = search?.get("q");

  return (
    <>
      <p className="text-h4 capitalize">
        Menampilkan:{" "}
        {searchQuery?.trim() ? searchQuery?.toString() : "Seluruh Produk"}
      </p>

      <ProdukList searchQuery={searchQuery?.toString()} />
    </>
  );
}

export default function page() {
  return (
    <UserProductWrapper>
      <div className="flex flex-col gap-4">
        <Suspense fallback={<Loading />}>
          <ProductList />
        </Suspense>
      </div>
    </UserProductWrapper>
  );
}
