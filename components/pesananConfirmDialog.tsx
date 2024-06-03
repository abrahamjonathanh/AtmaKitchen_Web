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

export default function PesananConfirmDialog({
  isOpen = false,
  setIsOpen,
  title = "Title...",
  buttonText = "Submit...", // Move this line above the 'description' parameter
  description = `Tindakkan ini tidak dapat diulang ketika anda menekan ${buttonText}.`,
  onSubmit,
  isLoading = false,
  children,
}: {
  isOpen?: boolean;
  setIsOpen?: Dispatch<SetStateAction<boolean>>;
  title?: string;
  description?: string;
  onSubmit?: () => void;
  isLoading?: boolean;
  buttonText?: string;
  children?: React.ReactNode;
}) {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="flex max-w-sm flex-col gap-8 sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription className="text-slate-500">
            {description}
          </DialogDescription>
          {children}
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
            {isLoading ? <Loading /> : buttonText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
