import { DragDropProvider } from "@dnd-kit/react";
import { useSortable } from "@dnd-kit/react/sortable";
import { move } from "@dnd-kit/helpers";
import type { OrderPublic } from "#/config/questions.config";
import { useQuizStore } from "#/store";
import { Card } from "#/components/shadcn/card";

const SortableItem = ({ id, index }: { id: string; index: number }) => {
	const { ref } = useSortable({ id, index });

	return (
		<Card ref={ref} className="cursor-pointer">
			{id}
		</Card>
	);
};

export const OrderQuestion = ({ question }: { question: OrderPublic }) => {
	const answer = useQuizStore((s) => s.answers[question.id]);
	const setAnswer = useQuizStore((s) => s.setAnswer);

	const shuffled = useQuizStore((s) => s.order[question.id]) ?? [];
	const order = Array.isArray(answer) ? answer : shuffled;

	return (
		<div className="flex flex-col">
			<span>{question.prompt}</span>
			<DragDropProvider
				onDragEnd={(e) => setAnswer(question.id, move(order, e))}
			>
				{shuffled.map((id, index) => (
					<SortableItem key={id} id={id} index={index} />
				))}
			</DragDropProvider>
		</div>
	);
};
