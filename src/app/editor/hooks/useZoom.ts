import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface ZoomState {
  zoom: number; // 0.5 = 50%, 2 = 200%
  setZoom: (value: number) => void;
}

export const useZoom = create<ZoomState>()(
  devtools(set => ({
    zoom: 1,
    setZoom: (value: number) => set({ zoom: Math.min(Math.max(value, 0.5), 2) }),
  }))
);
