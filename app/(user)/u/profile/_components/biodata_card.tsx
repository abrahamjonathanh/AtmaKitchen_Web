"use client";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";

const formSchema = z.object({
  nama: z.string().min(2).max(50),
  tgl_lahir: z.date(),
  email: z.string().email(),
});
export default function BiodataCard() {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nama: "",
      //   tgl_lahir: "",
      email: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 ">
        <div className="space-y-2">
          <p className="text-h4">Biodata Diri</p>
          <div className="space-y-4 sm:space-y-2">
            <div className="flex items-center gap-4">
              <FormLabel className="w-full sm:w-1/3 hidden sm:block text-slate-500">
                Nama
              </FormLabel>
              <FormField
                control={form.control}
                name="nama"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel className="block sm:hidden text-slate-500">
                      Nama
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Nama Lengkap..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex items-center gap-4">
              <FormLabel className="w-full sm:w-1/3 hidden sm:block text-slate-500">
                Tanggal Lahir
              </FormLabel>
              <FormField
                control={form.control}
                name="tgl_lahir"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel className="block sm:hidden text-slate-500">
                      Tanggal Lahir
                    </FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full pl-3 text-left font-normal ",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pilih tanggal lahir...</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date > new Date() || date < new Date("1900-01-01")
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        </div>
        <div className="space-y-2">
          <p className="text-h4">Informasi Kontak</p>
          <div className="flex items-center gap-4">
            <FormLabel className="w-full sm:w-1/3 hidden sm:block text-slate-500">
              Email
            </FormLabel>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel className="block sm:hidden text-slate-500">
                    Email
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Email..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <div className="flex gap-2 justify-end">
          <Button variant={"outline"} type="submit">
            Batal
          </Button>
          <Button type="submit">Perbarui data saya</Button>
        </div>
      </form>
    </Form>
  );
}
