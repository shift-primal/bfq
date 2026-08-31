import { PointerActivationConstraints, PointerSensor } from "@dnd-kit/dom";
import { move } from "@dnd-kit/helpers";
import { DragDropProvider } from "@dnd-kit/react";
import { useSortable } from "@dnd-kit/react/sortable";
import { DotsSixVerticalIcon } from "@phosphor-icons/react";
import { QuestionFieldSet } from "#/components/questions/QuestionFieldSet";
import { QuestionList } from "#/components/questions/QuestionList";
import { QuestionOption } from "#/components/questions/QuestionOption";
import { useAppSound } from "#/hooks/useAppSound";
import { useQuestionAnswer } from "#/hooks/useQuestionAnswer";
import { cn } from "#/lib/utils";
import { useDragStore } from "#/stores/drag-store";
import type { OrderPublic } from "#/types/quiz.types";

const EMPTY_OPTIONS: string[] = [];

const SortableItem = ({ id, index }: { id: string; index: number }) => {
	const { ref, isDragging } = useSortable({ id, index });

	return (
		<div ref={ref} className="touch-none p-1.5">
			<div
				className={cn(
					"transition-all duration-300",
					isDragging && "scale-110 drop-shadow-xl",
				)}
			>
				<QuestionOption variant="order" label={id}>
					<DotsSixVerticalIcon
						aria-hidden="true"
						className="size-4 shrink-0 text-muted-foreground"
					/>
				</QuestionOption>
			</div>
		</div>
	);
};

export const OrderQuestion = ({ question }: { question: OrderPublic }) => {
	const {
		answer,
		setAnswer,
		options: shuffled,
	} = useQuestionAnswer(question.id, EMPTY_OPTIONS);

	const { playDragLift, playDragDrop } = useAppSound();

	const order = Array.isArray(answer) ? answer : shuffled;

	return (
		<QuestionFieldSet prompt={question.prompt} questionType="order">
			<DragDropProvider
				sensors={(defaults) => [
					...defaults.filter((sensor) => sensor !== PointerSensor),
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
				onDragStart={() => {
					playDragLift();
					useDragStore.getState().setDragging(true);
				}}
				onDragEnd={(e) => {
					playDragDrop();
					useDragStore.getState().setDragging(false);
					setAnswer(question.id, move(order, e));
				}}
			>
				<QuestionList>
					{order.map((id, index) => (
						<SortableItem key={id} id={id} index={index} />
					))}
				</QuestionList>
			</DragDropProvider>
		</QuestionFieldSet>
	);
};
