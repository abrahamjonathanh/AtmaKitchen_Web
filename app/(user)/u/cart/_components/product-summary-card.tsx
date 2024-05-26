import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { cn, toRupiah, toThousand } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { addDays, format } from "date-fns";
import { CalendarIcon, Copy, ShieldCheck } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getAllMetodePembayaran } from "@/lib/api/metode-pembayaran";
import { IMetodePembayaran } from "@/lib/interfaces";
import { getPoinByIdPelanggan, getPoinByTotalHarga } from "@/lib/api/poin";
import { useCurrentUserStore } from "@/lib/state/user-store";

const formSchema = z.object({
  dob: z.date({
    required_error: "Tanggal tidak boleh kosong",
  }),
  poin: z.string().optional(),
  pengiriman: z.string().optional(),
  id_metode_pembayaran: z.string(),
});

export default function ProductSummaryCard({
  totalHarga,
  isEditable = false,
  data,
  onSubmit = (values) => console.log(values),
  onUpdatePengiriman = (values) => console.log(values),
}: {
  totalHarga: number;
  isEditable?: boolean;
  data?: any;
  onSubmit?: (values: z.infer<typeof formSchema>) => void;
  onUpdatePengiriman?: (values: boolean) => void;
}) {
  const { currentUser } = useCurrentUserStore();
  const [isUseAll, setIsUseAll] = useState(false);
  const [dataGetPoin, setDataGetPoin] = useState(0);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      poin: isEditable ? data?.poin ?? "" : "",
      dob: isEditable ? data?.dob ?? new Date() : new Date(),
    },
  });

  const pengirimanValue = form.watch("pengiriman");

  useEffect(() => {
    if (isUseAll) form.setValue("poin", dataPoin.data);
  }, [isUseAll, form]);

  useEffect(() => {
    onUpdatePengiriman(pengirimanValue != "Ambil Sendiri");
  }, [pengirimanValue, onUpdatePengiriman]);

  const metodePembayaran = getAllMetodePembayaran();
  const dataPoin = getPoinByIdPelanggan(currentUser?.id_pelanggan!);
  const getPoin = getPoinByTotalHarga(totalHarga);

  useEffect(() => {
    setDataGetPoin(getPoin.data);
  }, [getPoin, totalHarga]);

  return (
    !dataPoin.isLoading && (
      <Form {...form}>
        <div className="sticky h-max space-y-2 rounded-lg border border-slate-200 bg-white p-4 pb-6 lg:w-1/3">
          <p className="text-h4">Ringkasan Belanja</p>

          <div className="flex items-center justify-between">
            <p className="text-slate-500">Total Harga</p>
            <p className="font-medium">{toRupiah(totalHarga)}</p>
          </div>
          {form.watch("poin")! && (
            <div className="flex items-center justify-between">
              <p className="text-slate-500">Diskon Poin</p>
              <p className="font-medium text-green-600">
                {toRupiah(-form.watch("poin")! * 100)}
              </p>
            </div>
          )}
          <Separator />
          <div className="flex items-center justify-between">
            <p className="text-slate-500">Total Belanja</p>
            <p className="text-h4">
              {toRupiah(
                totalHarga - parseInt(form.watch("poin")! || "0") * 100,
              )}
            </p>
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <p className="text-slate-500">Poin Kamu</p>
            <p className="font-medium">{toThousand(dataPoin.data)} Poin</p>
          </div>

          <form
            onSubmit={form.handleSubmit(onSubmit!)}
            className="w-full space-y-4"
          >
            <div className="space-y-2">
              <FormField
                control={form.control}
                name="poin"
                render={({ field }) => (
                  <FormItem>
                    <Input
                      type="number"
                      placeholder="Pakai poin kamu"
                      {...field}
                      disabled={isUseAll}
                      max={dataPoin.data}
                    />
                  </FormItem>
                )}
              />
              <div className="flex items-center space-x-2">
                <Switch
                  checked={isUseAll}
                  onCheckedChange={() => {
                    setIsUseAll(!isUseAll);
                  }}
                  id="isUseAll"
                />
                <Label htmlFor="isUseAll">
                  Pakai semua poin ({toThousand(dataPoin.data)})
                </Label>
              </div>
              <FormDescription className="text-slate-500">
                Anda akan mendapatkan{" "}
                <span className="font-medium text-orange-600">
                  {dataGetPoin} poin
                </span>{" "}
                dari transaksi ini.
              </FormDescription>
            </div>

            <Separator />
            <FormField
              control={form.control}
              name="dob"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Tanggal</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground",
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Tanggal pesanan</span>
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
                          date < new Date(Date.now() - 24 * 60 * 60 * 1000)
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormDescription className="text-slate-500">
                    Pilih tanggal untuk pesanan kamu diantar atau diambil.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="pengiriman"
              render={({ field }) => (
                <FormItem>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih Jenis Pengiriman" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Ambil Sendiri">
                        Ambil Sendiri
                      </SelectItem>
                      <SelectItem value="Kurir Ojol">Kurir Ojol</SelectItem>
                      <SelectItem value="Kurir Toko">Kurir Toko</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            {!metodePembayaran.isLoading && metodePembayaran.data && (
              <FormField
                control={form.control}
                name="id_metode_pembayaran"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Metode Pembayaran</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih Metode Pembayaran" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {metodePembayaran.data.map(
                          (data: IMetodePembayaran, index: number) => (
                            <SelectItem
                              value={data.id_metode_pembayaran!.toString()}
                              key={index}
                            >
                              {data.nama}
                            </SelectItem>
                          ),
                        )}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            <Separator />
            {form.watch("pengiriman") === "Ambil Sendiri" && (
              <>
                <FormDescription className="flex items-center gap-1 text-slate-500">
                  Virtual Account:
                  <span className="font-medium text-black">
                    6691298182759
                  </span>{" "}
                  <Copy
                    size={"16"}
                    onClick={() =>
                      navigator.clipboard.writeText("6691298182759")
                    }
                    className="text-slate-500 hover:cursor-pointer"
                  />
                </FormDescription>
                <FormDescription className="flex items-center gap-1 text-slate-500">
                  Nominal Transfer:
                  <span className="font-medium text-black ">
                    {toRupiah(15000000)}
                  </span>{" "}
                  <Copy
                    size={"16"}
                    onClick={() => navigator.clipboard.writeText("15000000")}
                    className="text-slate-500 hover:cursor-pointer"
                  />
                </FormDescription>
                <Separator />
              </>
            )}
            <FormDescription className="text-slate-500">
              Jangan lupa untuk menyimpan bukti transfer untuk dikirimkan ke
              admin kami.
            </FormDescription>
            <Button
              type="submit"
              variant={"default"}
              className="flex w-full items-center gap-1"
            >
              Saya sudah bayar <ShieldCheck size={"16"} />
            </Button>
          </form>
        </div>
      </Form>
    )
  );
}
