import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { toast } from "sonner";
import { useShallow } from "zustand/react/shallow";
import { ConfirmDialog } from "#/components/ConfirmDialog";
import { Navigation } from "#/components/Navigation";
import { ReviewRenderer } from "#/components/review/ReviewRenderer";
import { ScrollableContent } from "#/components/ScrollableContent";
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
	const [confirmSubmitOpen, setConfirmSubmitOpen] = useState(false);

	const total = Object.keys(questions).length;

	const handleBack = () => {
		navigate({ to: "/quiz/$step", params: { step: String(total) } });
	};

	const handleNext = () => {
		if (!isValidQuiz(name, answers, questions)) {
			toast.error("Mangler svar på ett eller flere spørsmål");
			return;
		}

		setConfirmSubmitOpen(true);
	};

	const confirmSubmit = async () => {
		if (isSubmitting.current) return;
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
			<ScrollableContent>
				<ReviewRenderer />
			</ScrollableContent>
			<Navigation onBack={handleBack} onNext={handleNext} />

			<ConfirmDialog
				open={confirmSubmitOpen}
				onOpenChange={setConfirmSubmitOpen}
				title="Er du sikker?"
				description="Du kan ikke endre svarene dine etter at du har sendt inn"
				confirmLabel="Send inn"
				onConfirm={confirmSubmit}
			/>
		</>
	);
};

export const Route = createFileRoute("/quiz/review")({
	component: QuizReview,
});
