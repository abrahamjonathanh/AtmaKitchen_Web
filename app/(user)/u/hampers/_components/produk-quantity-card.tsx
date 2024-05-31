import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Loading from "@/components/ui/loading";

import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Minus, Plus, ShoppingCart } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const FormSchema = z.object({
  jumlah: z.string(),
});

/**
 * A card component for adjusting the quantity of a product and selecting a date.
 *
 * @param quantity - The current quantity of the product.
 * @param className - Additional CSS class name for the component.
 * @param onSubmit - Callback function to handle form submission.
 * @param onQuantityChange - Callback function to handle quantity change.
 */
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
  const date = new Date();
  date.setDate(date.getDate());

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
        "h-max space-y-4 rounded-lg border border-slate-200 p-4 lg:w-1/3",
        className,
      )}
    >
      <p className="text-h4">Atur Jumlah dan Tanggal</p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="flex items-center gap-1">
            <Button
              type="button"
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
              type="button"
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

          <Separator />

          <div className="flex items-center justify-between gap-4">
            <Button type="submit" className="flex w-full gap-2">
              Keranjang <ShoppingCart size={"16"} />
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
