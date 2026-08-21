import { PointerActivationConstraints, PointerSensor } from "@dnd-kit/dom";
import { move } from "@dnd-kit/helpers";
import { DragDropProvider } from "@dnd-kit/react";
import { useSortable } from "@dnd-kit/react/sortable";
import { DotsSixVerticalIcon } from "@phosphor-icons/react";
import { useShallow } from "zustand/react/shallow";
import { QuestionList } from "#/components/questions/QuestionList";
import { QuestionOption } from "#/components/questions/QuestionOption";
import { FieldLegend, FieldSet } from "#/components/shadcn/field";
import type { OrderPublic } from "#/config/questions.config";
import { useQuizStore } from "#/stores/quiz-store";

const EMPTY_OPTIONS: string[] = [];

const SortableItem = ({ id, index }: { id: string; index: number }) => {
	const { ref } = useSortable({ id, index });
	return (
		<div ref={ref} className="touch-none py-1.5">
			<QuestionOption variant="order" label={id}>
				<DotsSixVerticalIcon
					aria-hidden="true"
					className="size-4 shrink-0 text-muted-foreground"
				/>
			</QuestionOption>
		</div>
	);
};

export const OrderQuestion = ({ question }: { question: OrderPublic }) => {
	const { answer, setAnswer, shuffled } = useQuizStore(
		useShallow((s) => ({
			answer: s.answers[question.id],
			setAnswer: s.setAnswer,
			shuffled: s.questions[question.id]?.options ?? EMPTY_OPTIONS,
		})),
	);

	const order = Array.isArray(answer) ? answer : shuffled;

	return (
		<FieldSet>
			<FieldLegend>{question.prompt}</FieldLegend>
			<DragDropProvider
				sensors={[
					PointerSensor.configure({
						activationConstraints({ pointerType }) {
							return pointerType === "touch"
								? [
										new PointerActivationConstraints.Delay({
											value: 0,
											tolerance: 5,
										}),
									]
								: undefined;
						},
					}),
				]}
				onDragEnd={(e) => setAnswer(question.id, move(order, e))}
			>
				<QuestionList>
					{order.map((id, index) => (
						<SortableItem key={id} id={id} index={index} />
					))}
				</QuestionList>
			</DragDropProvider>
		</FieldSet>
	);
};
