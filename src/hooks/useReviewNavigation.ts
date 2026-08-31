import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { useShallow } from "zustand/react/shallow";
import { isAnswered } from "#/lib/questions.utils";
import { submitQuiz } from "#/server/submission.rpc";
import { useQuizStore } from "#/stores/quiz-store";
import type { ShuffledQuestion, SubmittedAnswer } from "#/types/quiz.types";

type Questions = Record<string, ShuffledQuestion>;

function isValidQuiz(
	name: string,
	answers: SubmittedAnswer,
	questions: Questions,
) {
	if (!name) return false;

	const missingQuestions = Object.keys(questions).filter(
		(id) => !isAnswered(questions[id].type, answers[id]),
	);

	return missingQuestions.length === 0;
}

export function useReviewNavigation() {
	const { name, questions, answers, reset } = useQuizStore(
		useShallow((s) => ({
			name: s.name,
			questions: s.questions,
			answers: s.answers,
			reset: s.reset,
		})),
	);

	const navigate = useNavigate();

	const [isSubmitting, setIsSubmitting] = useState(false);
	const [confirmSubmitOpen, setConfirmSubmitOpen] = useState(false);

	const total = Object.keys(questions).length;

	const handleBack = () => {
		navigate({ to: "/quiz/$step", params: { step: String(total) } });
	};

	const handleNext = () => {
		if (!isValidQuiz(name, answers, questions)) {
			toast.error("Mangler svar på ett eller flere spørsmål", {
				id: "app-toast",
			});
			return;
		}

		setConfirmSubmitOpen(true);
	};

	const confirmSubmit = async () => {
		if (isSubmitting) return;
		setIsSubmitting(true);

		try {
			const id = await submitQuiz({ data: { name, answers } });
			reset();
			navigate({ to: "/quiz/result", search: { highlight: id } });
		} catch {
			setIsSubmitting(false);
			setConfirmSubmitOpen(false);
			toast.error("Noe gikk galt, prøv igjen", { id: "app-toast" });
		}
	};

	return {
		handleBack,
		handleNext,
		confirmSubmitOpen,
		setConfirmSubmitOpen,
		confirmSubmit,
		isSubmitting,
	};
}
