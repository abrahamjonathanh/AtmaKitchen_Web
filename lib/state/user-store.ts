import { create } from "zustand";
import { IAkun } from "../interfaces";
import { persist, createJSONStorage } from "zustand/middleware";

interface User {
  id_karyawan?: string;
  id_pelanggan?: string;
  id_akun: string;
  akun: IAkun;
  nama: string;
  count_keranjang?: {
    detail_keranjang_count: number;
  };
  tgl_lahir?: string;
}

interface CurrentUserState {
  isLoggedIn: boolean;
  role: string | undefined;
  login: (user: User) => void;
  logout: () => void;
  currentUser?: User | null;
}

export const useCurrentUserStore = create<CurrentUserState>()(
  persist(
    (set) => ({
      isLoggedIn: false,
      role: undefined,
      login: (user: User) => set({ currentUser: user, isLoggedIn: true }),
      logout: () => set({ isLoggedIn: false, currentUser: null }),
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);
