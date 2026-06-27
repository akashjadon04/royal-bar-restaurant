import { create } from 'zustand';

interface LocationState {
  isOutOfRange: boolean;
  distance: number | null;
  setOutOfRange: (status: boolean) => void;
  setDistance: (dist: number) => void;
}

export const useLocationStore = create<LocationState>((set) => ({
  isOutOfRange: false,
  distance: null,
  setOutOfRange: (status) => set({ isOutOfRange: status }),
  setDistance: (dist) => set({ distance: dist }),
}));
