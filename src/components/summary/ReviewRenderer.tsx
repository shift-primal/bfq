import { FunnelIcon } from "@phosphor-icons/react";
import { useState } from "react";
import { useShallow } from "zustand/react/shallow";
import { Toggle } from "#/components/shadcn/toggle";
import { QuestionSummary } from "#/components/summary/QuestionSummary";
import { useAppSound } from "#/hooks/useAppSound";
import { isAnswered, isOrderUntouched } from "#/lib/questions.utils";
import { useQuizStore } from "#/stores/quiz-store";

export const ReviewRenderer = () => {
	const { questions, order, answers } = useQuizStore(
		useShallow((s) => ({
			answers: s.answers,
			questions: s.questions,
			order: s.order,
		})),
	);

	const { playSelect, playDeselect } = useAppSound();

	const [showOnlyUnanswered, setShowOnlyUnanswered] = useState(false);

	const filteredEntries = order
		.map((id, originalIndex) => ({
			id,
			question: questions[id],
			answer: answers[id],
			step: originalIndex + 1,
		}))
		.filter(({ question, answer }) => {
			if (!showOnlyUnanswered || !question) return true;

			return question.type === "order"
				? isOrderUntouched(question.options, answer)
				: !isAnswered(question.type, answer);
		});

	return (
		<div className="flex flex-col gap-y-4 p-1.5">
			<Toggle
				variant="outline"
				size="sm"
				pressed={showOnlyUnanswered}
				onPressedChange={() => {
					showOnlyUnanswered ? playDeselect() : playSelect();
					setShowOnlyUnanswered((p) => !p);
				}}
				className="self-start text-muted-foreground aria-pressed:text-foreground"
			>
				<FunnelIcon aria-hidden="true" data-icon="inline-start" />
				Kun usvarte
			</Toggle>
			{filteredEntries.map(({ id, question, answer, step }) => {
				if (!question) return null;

				return (
					<QuestionSummary
						key={id}
						mode="review"
						step={step}
						question={question}
						answer={answer}
					/>
				);
			})}
		</div>
	);
};
