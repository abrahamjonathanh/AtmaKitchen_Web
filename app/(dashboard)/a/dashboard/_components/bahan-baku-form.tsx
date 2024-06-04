import { z } from "zod";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { addDays, format, subDays } from "date-fns";
import { Calendar as CalendarIcon, File } from "lucide-react";
import { DateRange } from "react-day-picker";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { ReportBahanBakuUsageByPeriod } from "@/app/_components/report";
import { getBahanBakuUsageByDate } from "@/lib/api/pesanan";
import Loading from "@/components/ui/loading";

const formSchema = z.object({
  date: z.object({
    from: z.date(),
    to: z.date(),
  }),
});

export default function BahanBakuInputForm() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm({
    resolver: zodResolver(formSchema),
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsLoading(true);
      const response = await getBahanBakuUsageByDate({
        start_date: values.date.from.toISOString().split("T")[0],
        end_date: values.date.to.toISOString().split("T")[0],
      });
      setData(response.data.data);
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((values: any) => onSubmit(values))}
        className="flex flex-col gap-2 rounded-lg border border-slate-200 p-4"
      >
        <p className="text-h4">Generate Laporan Bulanan</p>
        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Date</FormLabel>
              <FormControl>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !field.value && "text-muted-foreground",
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {field.value?.from ? (
                        field.value.to ? (
                          <>
                            {format(field.value.from, "LLL dd, y")} -{" "}
                            {format(field.value.to, "LLL dd, y")}
                          </>
                        ) : (
                          format(field.value.from, "LLL dd, y")
                        )
                      ) : (
                        <span>Pick a date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      initialFocus
                      mode="range"
                      defaultMonth={field.value?.from}
                      selected={field.value}
                      onSelect={field.onChange}
                      numberOfMonths={2}
                    />
                  </PopoverContent>
                </Popover>
              </FormControl>
              <FormDescription>
                Pilih tanggal periode pemakaian bahan baku
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={isLoading}>
          {isLoading ? <Loading /> : "Submit"}
        </Button>
        {data.length > 0 && (
          <ReportBahanBakuUsageByPeriod
            data={data}
            start_date={form.getValues("date").from}
            end_date={form.getValues("date").to}
          />
        )}
      </form>
    </Form>
  );
}
