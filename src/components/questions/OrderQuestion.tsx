import { DragDropProvider } from "@dnd-kit/react";
import { useSortable } from "@dnd-kit/react/sortable";
import { move } from "@dnd-kit/helpers";
import type { OrderPublic } from "#/config/questions.config";
import { useQuizStore } from "#/store";
import { Card } from "#/components/shadcn/card";
import { useShallow } from "zustand/react/shallow";

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
		<Card ref={ref} className={disabled ? "cursor-default" : "cursor-pointer"}>
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
		<div className="flex flex-col">
			<span>{question.prompt}</span>
			<DragDropProvider
				onDragEnd={(e) => setAnswer(question.id, move(order, e))}
			>
				{shuffled.map((id, index) => (
					<SortableItem key={id} id={id} index={index} disabled={disabled} />
				))}
			</DragDropProvider>
		</div>
	);
};
