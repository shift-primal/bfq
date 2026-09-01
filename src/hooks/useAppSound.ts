import { useSound } from "#/hooks/use-sound";
import { back003Sound } from "#/lib/back-003";
import { click002Sound } from "#/lib/click-002";
import { click003Sound } from "#/lib/click-003";
import { confirmation001Sound } from "#/lib/confirmation-001";
import { drop002Sound } from "#/lib/drop-002";
import { drop003Sound } from "#/lib/drop-003";
import { error008Sound } from "#/lib/error-008";
import { select001Sound } from "#/lib/select-001";
import { successChimeSound } from "#/lib/success-chime";
import { useSoundStore } from "#/stores/sound-store";

const SOUNDS = {
	select: click003Sound,
	deselect: click002Sound,
	next: confirmation001Sound,
	prev: select001Sound,
	dragLift: drop002Sound,
	dragDrop: drop003Sound,
	success: successChimeSound,
	error: error008Sound,
	warn: back003Sound,
} as const;

export const useAppSound = () => {
	const { muted } = useSoundStore();
	const options = { soundEnabled: !muted };

	const [playSelect] = useSound(SOUNDS.select, options);
	const [playDeselect] = useSound(SOUNDS.deselect, options);
	const [playNext] = useSound(SOUNDS.next, options);
	const [playPrev] = useSound(SOUNDS.prev, options);
	const [playDragLift] = useSound(SOUNDS.dragLift, options);
	const [playDragDrop] = useSound(SOUNDS.dragDrop, options);
	const [playSuccess] = useSound(SOUNDS.success, options);
	const [playError] = useSound(SOUNDS.error, options);
	const [playWarn] = useSound(SOUNDS.warn, options);

	return {
		playSelect,
		playDeselect,
		playNext,
		playPrev,
		playDragLift,
		playDragDrop,
		playSuccess,
		playError,
		playWarn,
	};
};
