import React from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import Loading from "./ui/loading";

export default function ConfirmDialog({
  title = "Title...",
  description = "Tindakkan ini tidak dapat diulang ketika anda menekan Ubah.",
  onSubmit,
  isLoading = false,
  submitTitle = "Submit",
  children,
}: {
  title?: string;
  description?: string;
  onSubmit?: () => void;
  isLoading?: boolean;
  submitTitle?: string;
  children: React.ReactNode;
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="flex max-w-sm flex-col gap-8 sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription className="text-slate-500">
            {description}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
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
            {isLoading ? <Loading /> : submitTitle}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
