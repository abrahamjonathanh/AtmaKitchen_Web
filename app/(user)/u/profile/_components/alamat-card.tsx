import React from "react";
import AlamatDialog from "./alamat-dialog";

export default function AlamatCard() {
  return (
    <div className="p-4 rounded-lg border border-slate-200 space-y-2 shadow-md">
      <div>
        <p className="text-slate-500">Rumah Utama</p>
        <p className="text-large">John Petra</p>
        <p>0812571258</p>
        <p>Jln. Babarsari No. 1 , Depok, Kab. Sleman, D.I. Yogyakarta</p>
      </div>
      <AlamatDialog
        isEditable
        data={{
          label: "Rumah",
          nama: "Jessy",
          alamat: "Jln. Gogodian No 5",
          telepon: "192517825",
        }}
      />
    </div>
  );
}
