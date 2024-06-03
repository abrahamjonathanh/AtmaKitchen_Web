"use client";
import { z } from "zod";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import NotAvailable from "@/public/products/Not Available.png";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import ConfirmDialog from "@/components/confirmDialog";
import { Button } from "@/components/ui/button";

const formSchema = z.object({
  image: z.instanceof(File),
});
export default function PaymentForm({
  onSubmit = (values) => console.log(values),
  isLoading = false,
}: {
  onSubmit?: (values: z.infer<typeof formSchema>) => void;
  isLoading?: boolean;
}) {
  const [selectedImages, setSelectedImages] = useState<File>();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  useEffect(() => {
    form.setValue("image", selectedImages!);
    console.log(selectedImages);
  }, [selectedImages, form]);

  return (
    <div className="lg:w-1/2 xl:w-3/4">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex w-full flex-col gap-4"
          encType="multipart/form-data"
        >
          <p className="text-h4">Upload Bukti Pembayaran</p>
          {!selectedImages ? (
            <Image
              src={NotAvailable}
              alt="Brownies"
              className="aspect-square h-max w-full rounded-lg object-cover"
            />
          ) : (
            <Image
              src={URL.createObjectURL(selectedImages)}
              alt="Selected Image"
              className="aspect-square h-max w-full rounded-lg object-cover"
              width={500}
              height={500}
            />
          )}

          <FormField
            control={form.control}
            name="image"
            render={({ field: { onChange } }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input
                    type="file"
                    multiple
                    onChange={(e) => {
                      const files = Array.from(e.target.files ?? []) as File[];
                      setSelectedImages(files[0]);
                      onChange(selectedImages);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <p className="text-body text-slate-500">
            Besar file: maksimum 10.240.000 bytes (10 Megabytes). Ekstensi file
            yang diperbolehkan: .JPG .JPEG .PNG.
          </p>

          <ConfirmDialog
            title="Upload Bukti Pembayaran"
            onSubmit={() => onSubmit(form.getValues())}
            isLoading={isLoading}
          >
            <Button type="button">Upload</Button>
          </ConfirmDialog>
        </form>
      </Form>
    </div>
  );
}
