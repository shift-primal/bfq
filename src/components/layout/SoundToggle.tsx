import {
	SpeakerSimpleHighIcon,
	SpeakerSimpleSlashIcon,
} from "@phosphor-icons/react";
import { Button } from "#/components/shadcn/button";
import { click002Sound } from "#/lib/click-002";
import { click003Sound } from "#/lib/click-003";
import { playSound } from "#/lib/sound-engine";
import { useSoundStore } from "#/stores/sound-store";

export const SoundToggle = () => {
	const { muted, setMuted } = useSoundStore();

	const handleClick = () => {
		const nextMuted = !muted;
		setMuted(nextMuted);
		playSound(nextMuted ? click002Sound.dataUri : click003Sound.dataUri);
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
