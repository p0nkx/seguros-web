import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthState {
  isAuthenticated: boolean;
  role: string | null; // Para almacenar el rol del usuario (admin, user, etc.)
  login: (role: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      role: null,
      login: (role) => set({ isAuthenticated: true, role }),
      logout: () => set({ isAuthenticated: false, role: null }),
    }),
    { name: 'auth-storage' }
  )
);