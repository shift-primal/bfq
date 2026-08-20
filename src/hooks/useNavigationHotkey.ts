import { type Hotkey, useHotkey } from "@tanstack/react-hotkeys";
import { useIsAnyDialogOpen } from "#/stores/dialog-store";

export const useNavigationHotkey = (hotkey: Hotkey, callback: () => void) => {
	const dialogOpen = useIsAnyDialogOpen();

	useHotkey(hotkey, () => {
		if (dialogOpen) return;
		callback();
	});
};
