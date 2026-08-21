import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { useShallow } from "zustand/react/shallow";
import { getShuffledOrder } from "#/server/questions.rpc";
import { useQuizStore } from "#/stores/quiz-store";

export function useNameFormNavigation() {
	const { name, answers, setQuestions, reset } = useQuizStore(
		useShallow((s) => ({
			name: s.name,
			answers: s.answers,
			setQuestions: s.setQuestions,
			reset: s.reset,
		})),
	);
	const navigate = useNavigate();
	const [confirmBackOpen, setConfirmBackOpen] = useState(false);

	const hasProgress = name.trim() !== "" || Object.keys(answers).length > 0;

	const handleBack = () => {
		if (hasProgress) {
			setConfirmBackOpen(true);
			return;
		}
		navigate({ to: "/" });
	};

	const handleNext = async () => {
		if (name.trim() === "") {
			toast.error("Du må fylle ut navnet ditt");
			return;
		}

		if (Object.keys(useQuizStore.getState().questions).length === 0) {
			const questions = await getShuffledOrder();
			setQuestions(questions);
		}

		navigate({ to: "/quiz/$step", params: { step: "1" } });
	};

	const confirmBack = () => {
		reset();
		navigate({ to: "/" });
	};

	return {
		handleBack,
		handleNext,
		confirmBackOpen,
		setConfirmBackOpen,
		confirmBack,
	};
}
