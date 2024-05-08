// Forms
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import Loading from "@/components/ui/loading";
import { useRouter } from "next/navigation";
import { Pencil } from "lucide-react";
import { IKaryawan } from "@/lib/interfaces";
import UpdateDialog from "@/components/updateDialog";
import { useState } from "react";

const formSchema = z
  .object({
    id_karyawan: z.string(),
    nama: z.string().min(1, { message: "Nama tidak boleh kosong" }),
    alamat: z.string().min(1, { message: "Alamat tidak boleh kosong" }),
    email: z
      .string()
      .min(1, { message: "Email tidak boleh kosong" })
      .email({ message: "Email tidak valid" }),
    telepon: z.string().min(1, { message: "Telepon tidak boleh kosong" }),
    password: z.string().optional(),
    confirmPassword: z.string().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Konfirmasi Password tidak sama dengan password",
    path: ["confirmPassword"], // This sets which field the error is attached to, References: https://github.com/shadcn-ui/ui/discussions/2120
  });

export default function AdminProfileForm({
  data,
  onSubmit = (values) => console.log(values),
  isLoading = false,
}: {
  data: IKaryawan;
  onSubmit?: (values: z.infer<typeof formSchema>) => void;
  isLoading?: boolean;
}) {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id_karyawan: data.id_karyawan?.toString(),
      nama: data.nama,
      alamat: data.alamat,
      email: data.akun?.email || "",
      telepon: data.telepon,
      password: "",
      confirmPassword: "",
    },
  });
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex w-full flex-col gap-8 py-4 md:w-3/4">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit!)}
          className="h-max w-full space-y-6 rounded-lg"
        >
          <div className="space-y-4 sm:space-y-2">
            <p className="text-h4">Biodata Diri</p>
            <div className="flex items-center gap-4">
              <FormLabel className="hidden w-full sm:block sm:w-1/3">
                Nama
              </FormLabel>
              <FormField
                control={form.control}
                name="nama"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel className="block sm:hidden">Nama</FormLabel>
                    <FormControl>
                      <Input placeholder="Nama Lengkap..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex items-start gap-4 ">
              <FormLabel className="hidden w-full pt-1.5 sm:block sm:w-1/3">
                Alamat
              </FormLabel>
              <FormField
                control={form.control}
                name="alamat"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel className="block sm:hidden">Alamat</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Nama Lengkap..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className="space-y-4 sm:space-y-2">
            <p className="text-h4">Informasi Kontak</p>
            <div className="flex items-center gap-4">
              <FormLabel className="hidden w-full sm:block sm:w-1/3">
                Email
              </FormLabel>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel className="block sm:hidden">Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="Email..."
                        {...field}
                        disabled
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex items-center gap-4">
              <FormLabel className="hidden w-full sm:block sm:w-1/3">
                Telepon
              </FormLabel>
              <FormField
                control={form.control}
                name="telepon"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel className="block sm:hidden">Telepon</FormLabel>
                    <FormControl>
                      <Input placeholder="Telepon Lengkap..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className="space-y-4 sm:space-y-2">
            <p className="text-h4">Reset Password (Opsional)</p>
            <div className="flex items-center gap-4">
              <FormLabel className="hidden w-full sm:block sm:w-1/3">
                Password Baru
              </FormLabel>
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel className="block sm:hidden">
                      Password Baru
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Password Baru..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex items-center gap-4">
              <FormLabel className="hidden w-full sm:block sm:w-1/3">
                Konfirmasi Password Baru
              </FormLabel>
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel className="block sm:hidden">
                      Konfirmasi Password Baru
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Konfirmasi Password Baru..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className="flex justify-end gap-4">
            <Button variant={"outline"} onClick={() => router.back()}>
              Batal
            </Button>
            <Button
              type="button"
              className="flex gap-2"
              disabled={isLoading}
              onClick={() => setIsOpen(true)}
            >
              {isLoading ? (
                <Loading />
              ) : (
                <>
                  Ubah Data Saya <Pencil size={"16"} />
                </>
              )}
            </Button>
            <UpdateDialog
              isOpen={isOpen}
              setIsOpen={setIsOpen}
              title={"Ubah"}
              description={
                "Tindakkan ini tidak dapat diulang ketika anda menekan Ubah"
              }
              onSubmit={() => onSubmit(form.getValues())}
              isLoading={isLoading}
            />
          </div>
        </form>
      </Form>
    </div>
  );
}
