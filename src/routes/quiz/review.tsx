import { useQuizStore, type Answer, type ShuffledQuestion } from "#/store";
import { useShallow } from "zustand/react/shallow";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { isAnswered } from "#/lib/questions.utils";
import { ReviewRenderer } from "#/components/ReviewRenderer";
import { Navigation } from "#/components/Navigation";
import { toast } from "sonner";
import { submitQuiz } from "#/server/questions.rpc";

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
	const { name, questions, answers } = useQuizStore(
		useShallow((s) => ({
			name: s.name,
			questions: s.questions,
			answers: s.answers,
		})),
	);
	const navigate = useNavigate();

	const total = Object.keys(questions).length;

	const handleBack = () => {
		navigate({ to: "/quiz/$step", params: { step: String(total) } });
	};

	const handleNext = async () => {
		if (!isValidQuiz(name, answers, questions)) {
			toast.error("Mangler svar på ett eller flere spørsmål");
			return;
		}

		const result = await submitQuiz({ data: { name, answers } });

		console.log(result);

		// TODO: navigate({ to: "/leaderboard" });
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
