import { PointerActivationConstraints, PointerSensor } from "@dnd-kit/dom";
import { move } from "@dnd-kit/helpers";
import { DragDropProvider } from "@dnd-kit/react";
import { useSortable } from "@dnd-kit/react/sortable";
import { DotsSixVerticalIcon } from "@phosphor-icons/react";
import type { ComponentProps } from "react";
import { QuestionFieldSet } from "#/components/questions/QuestionFieldSet";
import { QuestionList } from "#/components/questions/QuestionList";
import { QuestionOption } from "#/components/questions/QuestionOption";
import { useAppSound } from "#/hooks/useAppSound";
import { useQuestionAnswer } from "#/hooks/useQuestionAnswer";
import { cn } from "#/lib/utils";
import { useDragStore } from "#/stores/drag-store";
import type { OrderPublic } from "#/types/quiz.types";

const EMPTY_OPTIONS: string[] = [];

const configuredPointerSensor = PointerSensor.configure({
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
});

const getSensors: NonNullable<
	ComponentProps<typeof DragDropProvider>["sensors"]
> = (defaults) => [
	...defaults.filter((sensor) => sensor !== PointerSensor),
	configuredPointerSensor,
];

const SortableItem = ({ id, index }: { id: string; index: number }) => {
	const { ref, handleRef, isDragging } = useSortable({ id, index });

	return (
		<div ref={ref} className="p-1.5">
			<div
				className={cn(
					"transition-all duration-300",
					isDragging && "scale-110 drop-shadow-xl",
				)}
			>
				<QuestionOption label={id}>
					{/* Only the handle captures the drag gesture (touch-action:
					none), not the whole row — otherwise a touch anywhere on the
					card starts a reorder instead of letting the page scroll. */}
					<span
						ref={handleRef}
						className="-m-2 flex shrink-0 touch-none items-center justify-center p-2 text-muted-foreground active:cursor-grabbing"
					>
						<DotsSixVerticalIcon aria-hidden="true" className="size-4" />
					</span>
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
				sensors={getSensors}
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
				<QuestionList slot="sortable-group">
					{order.map((id, index) => (
						<SortableItem key={id} id={id} index={index} />
					))}
				</QuestionList>
			</DragDropProvider>
		</QuestionFieldSet>
	);
};
