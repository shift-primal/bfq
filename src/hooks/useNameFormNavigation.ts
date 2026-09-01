import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { useShallow } from "zustand/react/shallow";
import { useAppSound } from "#/hooks/useAppSound";
import { nameSchema } from "#/lib/name.schema";
import { getShuffledOrder } from "#/server/questions.rpc";
import { useQuizStore } from "#/stores/quiz-store";

export function useNameFormNavigation() {
	const { name, setQuestions } = useQuizStore(
		useShallow((s) => ({
			name: s.name,
			setQuestions: s.setQuestions,
		})),
	);

	const { playNext, playPrev, playError } = useAppSound();

	const navigate = useNavigate();

	const handleBack = () => {
		playPrev();
		navigate({ to: "/" });
	};

	const handleNext = async () => {
		const result = nameSchema.safeParse(name);

		if (!result.success) {
			toast.error(result.error.issues[0].message, { id: "app-toast" });
			playError();
			return;
		}

		if (Object.keys(useQuizStore.getState().questions).length === 0) {
			const { questions, order } = await getShuffledOrder();
			setQuestions(questions, order);
		}

		playNext();
		navigate({ to: "/quiz/$step", params: { step: "1" } });
	};

	return {
		handleBack,
		handleNext,
	};
}
