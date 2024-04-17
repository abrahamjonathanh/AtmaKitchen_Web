import React from "react";
import AlamatCard from "./alamat-card";
import AlamatDialog from "./alamat-dialog";

export default function Alamat() {
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-start">
        <p className="text-h4">Biodata Diri</p>
        <AlamatDialog />
      </div>
      <div className="space-y-4">
        {[1, 2, 3, 4].map((data, index) => (
          <AlamatCard key={index} />
        ))}
      </div>
    </div>
  );
}
