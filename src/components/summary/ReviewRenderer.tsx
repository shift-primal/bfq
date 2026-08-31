import { FunnelIcon } from "@phosphor-icons/react";
import { useState } from "react";
import { useShallow } from "zustand/react/shallow";
import { Toggle } from "#/components/shadcn/toggle";
import { QuestionSummary } from "#/components/summary/QuestionSummary";
import { useAppSound } from "#/hooks/useAppSound";
import { isAnswered, isOrderUntouched } from "#/lib/questions.utils";
import { useQuizStore } from "#/stores/quiz-store";

export const ReviewRenderer = () => {
	const { questions, answers } = useQuizStore(
		useShallow((s) => ({
			answers: s.answers,
			questions: s.questions,
		})),
	);

	const { playSelect, playDeselect } = useAppSound();

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
				onPressedChange={() => {
					showOnlyUnanswered ? playDeselect() : playSelect();
					setShowOnlyUnanswered((p) => !p);
				}}
				className="self-start text-muted-foreground aria-pressed:text-foreground"
			>
				<FunnelIcon aria-hidden="true" data-icon="inline-start" />
				Kun usvarte
			</Toggle>
			{filteredEntries.map(([id, q], index) => (
				<QuestionSummary
					key={id}
					mode="review"
					step={index + 1}
					question={q}
					answer={answers[id]}
				/>
			))}
		</div>
	);
};
