import { create } from "zustand";

type DragState = {
	dragging: boolean;
	setDragging: (dragging: boolean) => void;
};

export const useDragStore = create<DragState>((set) => ({
	dragging: false,
	setDragging: (dragging) => set({ dragging }),
}));

export const useIsDragging = () => useDragStore((s) => s.dragging);
