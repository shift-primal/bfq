import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { toast } from "sonner";
import { useShallow } from "zustand/react/shallow";
import { Navigation } from "#/components/Navigation";
import { ReviewRenderer } from "#/components/review/ReviewRenderer";
import { ScrollableContent } from "#/components/ScrollableContent";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from "#/components/shadcn/alert-dialog";
import { isAnswered } from "#/lib/questions.utils";
import { submitQuiz } from "#/server/questions.rpc";
import {
	type Answer,
	type ShuffledQuestion,
	useQuizStore,
} from "#/stores/quiz-store";

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

			<AlertDialog open={confirmSubmitOpen} onOpenChange={setConfirmSubmitOpen}>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>Er du sikker?</AlertDialogTitle>
						<AlertDialogDescription>
							Du kan ikke endre svarene dine etter at du har sendt inn
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel>Avbryt</AlertDialogCancel>
						<AlertDialogAction onClick={confirmSubmit}>
							Send inn
						</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</>
	);
};

export const Route = createFileRoute("/quiz/review")({
	component: QuizReview,
});
