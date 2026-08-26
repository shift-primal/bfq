import { useShallow } from "zustand/react/shallow";
import { useQuizStore } from "#/stores/quiz-store";

export function useQuizResumeTarget() {
	const { name, currentStep } = useQuizStore(
		useShallow((s) => ({ name: s.name, currentStep: s.currentStep })),
	);

	if (!name) {
		return { to: "/quiz/start" } as const;
	}

	return { to: "/quiz/$step", params: { step: String(currentStep) } } as const;
}
