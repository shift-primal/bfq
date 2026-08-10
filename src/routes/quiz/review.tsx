import { useQuizStore, type Answer, type ShuffledQuestion } from "#/store";
import { useShallow } from "zustand/react/shallow";
import { createFileRoute } from "@tanstack/react-router";
import { isAnswered } from "#/lib/questions.utils";
import { AnswerReview } from "#/components/AnswerReview";

function isValidQuiz(
	name: string,
	answers: Record<string, Answer>,
	questions: Record<string, ShuffledQuestion>,
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

	const isValid = isValidQuiz(name, answers, questions);

	return (
		<>
			<AnswerReview />
		</>
	);
};

export const Route = createFileRoute("/quiz/review")({
	component: QuizReview,
});
