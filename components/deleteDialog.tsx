import React, { Dispatch, SetStateAction } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Button } from "./ui/button";

export default function DeleteDialog({
  isOpen = false,
  setIsOpen,
  title = "Title...",
  description = "Dialog description...",
  onSubmit,
}: {
  isOpen?: boolean;
  setIsOpen?: Dispatch<SetStateAction<boolean>>;
  title?: string;
  description?: string;
  onSubmit?: () => void;
}) {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-md flex flex-col gap-8">
        <DialogHeader>
          <DialogTitle>Hapus {title}</DialogTitle>
          <DialogDescription className="text-slate-500">
            {description}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="sm:justify-end">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Batal
            </Button>
          </DialogClose>
          <Button type="button" variant="default" onClick={onSubmit}>
            Hapus
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
