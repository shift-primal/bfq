import { create } from "zustand";

type SoundState = {
	muted: boolean;
	setMuted: (muted: boolean) => void;
};

export const useSoundStore = create<SoundState>((set) => ({
	muted: false,
	setMuted: (muted) => set({ muted }),
}));

export const useIsMuted = () => useSoundStore((s) => s.muted);
