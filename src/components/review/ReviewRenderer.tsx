import { FunnelIcon } from "@phosphor-icons/react";
import { useState } from "react";
import { useShallow } from "zustand/react/shallow";
import { ReviewMultiQuestion } from "#/components/review/ReviewMultiQuestion";
import { ReviewOrderQuestion } from "#/components/review/ReviewOrderQuestion";
import { ReviewSelectQuestion } from "#/components/review/ReviewSelectQuestion";
import { Toggle } from "#/components/shadcn/toggle";
import { isAnswered, isOrderUntouched } from "#/lib/questions.utils";
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

	const [showOnlyUnanswered, setShowOnlyUnanswered] = useState(false);

	const filteredEntries = Object.entries(questions).filter(([id, q]) => {
		if (!showOnlyUnanswered) return true;

		return q.type === "order"
			? isOrderUntouched(q.options, answers[id])
			: !isAnswered(q.type, answers[id]);
	});

	return (
		<div className="flex flex-col gap-y-4 p-1.5">
			<Toggle
				variant="outline"
				size="sm"
				pressed={showOnlyUnanswered}
				onPressedChange={() => setShowOnlyUnanswered((p) => !p)}
				className="self-start text-muted-foreground aria-pressed:text-foreground"
			>
				<FunnelIcon data-icon="inline-start" />
				Kun usvarte
			</Toggle>
			{filteredEntries.map(([id, q], index) => (
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
