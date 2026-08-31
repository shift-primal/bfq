import { useSound } from "#/hooks/use-sound";
import { back003Sound } from "#/lib/back-003";
import { click002Sound } from "#/lib/click-002";
import { click003Sound } from "#/lib/click-003";
import { confirmation001Sound } from "#/lib/confirmation-001";
import { drop002Sound } from "#/lib/drop-002";
import { drop003Sound } from "#/lib/drop-003";
import { select001Sound } from "#/lib/select-001";

const SOUNDS = {
	select: click003Sound,
	deselect: click002Sound,
	next: confirmation001Sound,
	prev: select001Sound,
	dragLift: drop002Sound,
	dragDrop: drop003Sound,
	warn: back003Sound,
} as const;

export const useAppSound = () => {
	const [playSelect] = useSound(SOUNDS.select);
	const [playDeselect] = useSound(SOUNDS.deselect);
	const [playNext] = useSound(SOUNDS.next);
	const [playPrev] = useSound(SOUNDS.prev);
	const [playDragLift] = useSound(SOUNDS.dragLift);
	const [playDragDrop] = useSound(SOUNDS.dragDrop);
	const [playWarn] = useSound(SOUNDS.warn);

	return {
		playSelect,
		playDeselect,
		playNext,
		playPrev,
		playDragLift,
		playDragDrop,
		playWarn,
	};
};
