import { create } from 'zustand';

interface LocationState {
  isOutOfRange: boolean;
  distance: number | null;
  address: string;
  setOutOfRange: (status: boolean) => void;
  setDistance: (dist: number) => void;
  setAddress: (addr: string) => void;
}

export const useLocationStore = create<LocationState>((set) => ({
  isOutOfRange: false,
  distance: null,
  address: '',
  setOutOfRange: (status) => set({ isOutOfRange: status }),
  setDistance: (dist) => set({ distance: dist }),
  setAddress: (addr) => set({ address: addr }),
}));
