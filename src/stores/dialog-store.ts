import { create } from "zustand";

type DialogState = {
	openCount: number;
	registerOpen: (open: boolean) => void;
};

export const useDialogStore = create<DialogState>((set) => ({
	openCount: 0,
	registerOpen: (open) =>
		set((s) => ({ openCount: s.openCount + (open ? 1 : -1) })),
}));

export const useIsAnyDialogOpen = () => useDialogStore((s) => s.openCount > 0);
