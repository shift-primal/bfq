import { type Hotkey, useHotkey } from "@tanstack/react-hotkeys";
import { useIsAnyDialogOpen } from "#/stores/dialog-store";
import { useIsDragging } from "#/stores/drag-store";

export const useNavigationHotkey = (hotkey: Hotkey, callback: () => void) => {
	const dialogOpen = useIsAnyDialogOpen();
	const dragging = useIsDragging();

	useHotkey(hotkey, () => {
		if (dialogOpen || dragging) return;
		callback();
	});
};
