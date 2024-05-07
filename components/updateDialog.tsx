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
import Loading from "./ui/loading";

export default function DeleteDialog({
  isOpen = false,
  setIsOpen,
  title = "Title...",
  description = "Tindakkan ini tidak dapat diulang ketika anda menekan Ubah.",
  onSubmit,
  isLoading = false,
}: {
  isOpen?: boolean;
  setIsOpen?: Dispatch<SetStateAction<boolean>>;
  title?: string;
  description?: string;
  onSubmit?: () => void;
  isLoading?: boolean;
}) {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="flex max-w-sm flex-col gap-8 sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Ubah</DialogTitle>
          <DialogDescription className="text-slate-500">
            {description}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Batal
            </Button>
          </DialogClose>
          <Button
            type="button"
            variant="default"
            onClick={onSubmit}
            disabled={isLoading}
          >
            {isLoading ? <Loading title="Updating..." /> : "Ubah"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
