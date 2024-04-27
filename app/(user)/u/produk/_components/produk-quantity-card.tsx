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
import Loading from "@/components/ui/loading";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon, Minus, Plus, ShoppingCart } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const FormSchema = z.object({
  dob: z.date({
    required_error: "Tanggal tidak boleh kosong",
  }),
  jumlah: z.string(),
});

export default function ProductQuantityCard({
  quantity,
  className,
  onSubmit = (values) => console.log(values),
  onQuantityChange,
}: {
  quantity: string;
  className?: string;
  onSubmit?: (values: z.infer<typeof FormSchema>) => void;
  onQuantityChange?: (value: number) => void;
}) {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      jumlah: quantity,
    },
  });

  useEffect(() => {
    form.setValue("jumlah", quantity);
  }, [quantity, form]);

  return (
    <div
      className={cn(
        "lg:w-1/3 p-4 border rounded-lg border-slate-200 h-max space-y-4",
        className
      )}
    >
      <p className="text-h4">Atur Jumlah dan Tanggal</p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="flex gap-1 items-center">
            <Button
              variant={"outline"}
              size={"sm"}
              onClick={() => {
                onQuantityChange!(-1);
              }}
              disabled={quantity == "1"}
              className="hover:bg-transparent"
            >
              {isLoading ? <Loading iconOnly /> : <Minus size={"16"} />}
            </Button>

            <FormField
              control={form.control}
              name="jumlah"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="number"
                      className="max-w-14 overflow-x-hidden"
                      disabled={isLoading}
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button
              variant={"outline"}
              size={"sm"}
              onClick={() => {
                onQuantityChange!(1);
              }}
              disabled={isLoading}
              className="hover:bg-transparent"
            >
              {isLoading ? <Loading iconOnly /> : <Plus size={"16"} />}
            </Button>
          </div>
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
                          !field.value && "text-muted-foreground"
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
                <FormDescription>
                  Pilih tanggal untuk pesanan kamu diantar atau diambil.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Separator />
          <Button variant={"outline"} className="w-full">
            Perbarui Tanggal
          </Button>
          <div className="flex gap-4 items-center justify-between">
            <Button variant={"outline"} className="w-full">
              Beli
            </Button>
            <Button type="submit" className="flex gap-2 w-full">
              Keranjang <ShoppingCart size={"16"} />
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
