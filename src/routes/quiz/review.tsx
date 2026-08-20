import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useRef } from "react";
import { toast } from "sonner";
import { useShallow } from "zustand/react/shallow";
import { Navigation } from "#/components/Navigation";
import { ReviewRenderer } from "#/components/ReviewRenderer";
import { isAnswered } from "#/lib/questions.utils";
import { submitQuiz } from "#/server/questions.rpc";
import { type Answer, type ShuffledQuestion, useQuizStore } from "#/store";

export type SubmittedAnswer = Record<string, Answer>;
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

const QuizReview = () => {
	const { name, questions, answers, reset } = useQuizStore(
		useShallow((s) => ({
			name: s.name,
			questions: s.questions,
			answers: s.answers,
			reset: s.reset,
		})),
	);

	const navigate = useNavigate();

	const isSubmitting = useRef(false);

	const total = Object.keys(questions).length;

	const handleBack = () => {
		navigate({ to: "/quiz/$step", params: { step: String(total) } });
	};

	const handleNext = async () => {
		if (isSubmitting.current) return;

		if (!isValidQuiz(name, answers, questions)) {
			toast.error("Mangler svar på ett eller flere spørsmål");
			return;
		}

		isSubmitting.current = true;

		try {
			const id = await submitQuiz({ data: { name, answers } });
			reset();
			navigate({ to: "/leaderboard", search: { highlight: id } });
		} catch {
			isSubmitting.current = false;
			toast.error("Noe gikk galt, prøv igjen");
		}
	};

	return (
		<>
			<ReviewRenderer />
			<Navigation onBack={handleBack} onNext={handleNext} />
		</>
	);
};

export const Route = createFileRoute("/quiz/review")({
	component: QuizReview,
});
