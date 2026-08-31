import { useShallow } from "zustand/react/shallow";
import { ReviewMultiQuestion } from "#/components/review/ReviewMultiQuestion";
import { ReviewOrderQuestion } from "#/components/review/ReviewOrderQuestion";
import { ReviewSelectQuestion } from "#/components/review/ReviewSelectQuestion";
import { useQuizStore } from "#/stores/quiz-store";
import type { Answer, ShuffledQuestion } from "#/types/quiz.types";

const RenderReviewQuestion = ({
	step,
	question,
	answer,
}: {
	step: number;
	question: ShuffledQuestion;
	answer: Answer | undefined;
}) => {
	switch (question.type) {
		case "select":
			return (
				<ReviewSelectQuestion
					step={step}
					question={question}
					answer={answer as string | undefined}
				/>
			);
		case "multi":
			return (
				<ReviewMultiQuestion
					step={step}
					question={question}
					answer={answer as string[] | undefined}
				/>
			);
		case "order":
			return (
				<ReviewOrderQuestion
					step={step}
					question={question}
					answer={answer as string[] | undefined}
				/>
			);
	}
};

export const ReviewRenderer = () => {
	const { questions, answers } = useQuizStore(
		useShallow((s) => ({
			answers: s.answers,
			questions: s.questions,
		})),
	);

	return (
		<div className="flex flex-col gap-y-4 p-1.5">
			{Object.entries(questions).map(([id, q], index) => (
				<RenderReviewQuestion
					key={id}
					step={index + 1}
					question={q}
					answer={answers[id]}
				/>
			))}
		</div>
	);
};
