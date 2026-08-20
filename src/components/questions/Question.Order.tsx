import { move } from "@dnd-kit/helpers";
import { DragDropProvider } from "@dnd-kit/react";
import { useSortable } from "@dnd-kit/react/sortable";
import { useShallow } from "zustand/react/shallow";
import { QuestionList } from "#/components/questions/QuestionList";
import { QuestionOption } from "#/components/questions/QuestionOption";
import { FieldLegend, FieldSet } from "#/components/shadcn/field";
import type { OrderPublic } from "#/config/questions.config";
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
		<QuestionOption
			ref={ref}
			variant="order"
			label={id}
			data-disabled={disabled || undefined}
		/>
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
				<QuestionList>
					{order.map((id, index) => (
						<>
							<SortableItem
								key={id}
								id={id}
								index={index}
								disabled={disabled}
							/>
						</>
					))}
				</QuestionList>
			</DragDropProvider>
		</FieldSet>
	);
};
