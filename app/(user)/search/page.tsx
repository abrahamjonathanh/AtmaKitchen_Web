"use client";
import { NavbarUser } from "@/components/navbar";
import { useSearchParams } from "next/navigation";
import React, { Suspense } from "react";

export default function page() {
  const search = useSearchParams();
  const searchQuery = search?.get("q");
  console.log(searchQuery);
  return (
    <Suspense>
      <div>
        <NavbarUser />
        <p>Showing: {searchQuery}</p>
      </div>
    </Suspense>
  );
}
