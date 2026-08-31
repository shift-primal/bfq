import { useNavigate } from "@tanstack/react-router";
import { useAppSound } from "#/hooks/useAppSound";

export function useStepNavigation(step: number, total: number) {
	const navigate = useNavigate();

	const { playPrev, playNext } = useAppSound();

	const handleBack = () => {
		playPrev();
		if (step === 1) navigate({ to: "/quiz/start" });
		else navigate({ to: "/quiz/$step", params: { step: String(step - 1) } });
	};

	const handleNext = () => {
		playNext();
		if (step >= total) navigate({ to: "/quiz/review" });
		else navigate({ to: "/quiz/$step", params: { step: String(step + 1) } });
	};

	return { handleBack, handleNext };
}
