import {
	SpeakerSimpleHighIcon,
	SpeakerSimpleSlashIcon,
} from "@phosphor-icons/react";
import { Button } from "#/components/shadcn/button";
import { SOUNDS } from "#/hooks/useAppSound";
import { playSound } from "#/lib/sound-engine";
import { useSoundStore } from "#/stores/sound-store";

export const SoundToggle = () => {
	const { muted, setMuted } = useSoundStore();

	const handleClick = () => {
		const nextMuted = !muted;
		setMuted(nextMuted);

		// Need to use the raw engine to play sounds to ignore muted options on custom hook
		playSound(nextMuted ? SOUNDS.select.dataUri : SOUNDS.deselect.dataUri);
	};

	return (
		<Button
			variant="ghost"
			size="icon"
			aria-label={muted ? "Skru på lydeffekter" : "Skru av lydeffekter"}
			onClick={handleClick}
		>
			{muted ? (
				<SpeakerSimpleSlashIcon aria-hidden="true" />
			) : (
				<SpeakerSimpleHighIcon aria-hidden="true" />
			)}
		</Button>
	);
};
