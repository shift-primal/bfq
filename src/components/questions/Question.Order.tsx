import { move } from "@dnd-kit/helpers";
import { DragDropProvider } from "@dnd-kit/react";
import { useSortable } from "@dnd-kit/react/sortable";
import { useShallow } from "zustand/react/shallow";
import { Card } from "#/components/shadcn/card";
import { FieldLegend, FieldSet } from "#/components/shadcn/field";
import type { OrderPublic } from "#/config/questions.config";
import { cn } from "#/lib/utils";
import { useQuizStore } from "#/stores/quiz-store";

const SortableItem = ({
	id,
	index,
	disabled,
}: {
	id: string;
	index: number;
	disabled: boolean;
}) => {
	const { ref } = useSortable({ id, index, disabled });

	return (
		<Card
			ref={ref}
			className={cn(
				"select-none",
				disabled ? "cursor-default" : "cursor-pointer",
			)}
		>
			{id}
		</Card>
	);
};

export const OrderQuestion = ({
	question,
	disabled = false,
}: {
	question: OrderPublic;
	disabled?: boolean;
}) => {
	const { answer, setAnswer, shuffled } = useQuizStore(
		useShallow((s) => ({
			answer: s.answers[question.id],
			setAnswer: s.setAnswer,
			shuffled: s.questions[question.id]?.options ?? [],
		})),
	);

	const order = Array.isArray(answer) ? answer : shuffled;

	return (
		<FieldSet disabled={disabled}>
			<FieldLegend>{question.prompt}</FieldLegend>
			<DragDropProvider
				onDragEnd={(e) => setAnswer(question.id, move(order, e))}
			>
				<div className="flex flex-col gap-2">
					{order.map((id, index) => (
						<SortableItem key={id} id={id} index={index} disabled={disabled} />
					))}
				</div>
			</DragDropProvider>
		</FieldSet>
	);
};
