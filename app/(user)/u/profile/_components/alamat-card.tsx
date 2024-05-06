import React, { useState } from "react";
import AlamatDialog from "./alamat-dialog";
import { IAlamat } from "@/lib/interfaces";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import DeleteDialog from "@/components/deleteDialog";
import { deleteAlamatById } from "@/lib/api/alamat";

export default function AlamatCard({
  data,
  onRefresh = () => console.log("onRefresh triggered"),
}: {
  data: IAlamat;
  onRefresh?: () => void;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const onDeleteHandler = async () => {
    try {
      setIsLoading(true);
      await deleteAlamatById(parseInt(data.id_alamat));
      onRefresh!();
    } catch (error: any) {
      console.error("Error deleting bahan baku: " + error);
    } finally {
      setIsLoading(false);
      setIsOpen(false);
    }
  };

  return (
    <div className="space-y-2 rounded-lg border border-slate-200 p-4 shadow-md">
      <div>
        <p className="text-slate-500">{data.label}</p>
        <p className="text-large">{data.nama}</p>
        <p>{data.telepon}</p>
        <p>{data.alamat}</p>
      </div>
      <div className="flex flex-row items-center gap-2">
        <AlamatDialog isEditable data={data} />
        <Button
          size={"sm"}
          variant={"outline"}
          className="flex gap-1"
          onClick={() => setIsOpen(true)}
        >
          <Trash2 size={"16"} /> Hapus
        </Button>
        <DeleteDialog
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          title={data.label}
          isLoading={isLoading}
          onSubmit={onDeleteHandler}
        />
      </div>
    </div>
  );
}
