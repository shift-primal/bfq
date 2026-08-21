import { useNavigate } from "@tanstack/react-router";

export function useStepNavigation(step: number, total: number) {
	const navigate = useNavigate();

	const handleBack = () => {
		if (step === 1) navigate({ to: "/quiz/start" });
		else navigate({ to: "/quiz/$step", params: { step: String(step - 1) } });
	};

	const handleNext = () => {
		if (step >= total) navigate({ to: "/quiz/review" });
		else navigate({ to: "/quiz/$step", params: { step: String(step + 1) } });
	};

	return { handleBack, handleNext };
}
