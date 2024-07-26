import { create } from "zustand";

export const useStateStore = create((set) => ({
  activeSection: "home",
  setActiveSection: (activeSection) => set({ activeSection }),
}));