import { Checkbox as CheckboxPrimitive } from "radix-ui";
import { useShallow } from "zustand/react/shallow";
import { QuestionList } from "#/components/questions/QuestionList";
import { QuestionOption } from "#/components/questions/QuestionOption";
import { FieldLegend, FieldSet } from "#/components/shadcn/field";
import type { MultiPublic } from "#/config/questions.config";
import { useQuizStore } from "#/stores/quiz-store";

export const MultiQuestion = ({
	question,
	disabled = false,
}: {
	question: MultiPublic;
	disabled?: boolean;
}) => {
	const { answer, setAnswer, options } = useQuizStore(
		useShallow((s) => ({
			answer: s.answers[question.id],
			setAnswer: s.setAnswer,
			options: s.questions[question.id]?.options ?? question.options,
		})),
	);

	const toggle = (option: string) => {
		const current = Array.isArray(answer) ? answer : [];

		const next = current.includes(option)
			? current.filter((o) => o !== option)
			: [...current, option];

		setAnswer(question.id, next);
	};

	return (
		<FieldSet disabled={disabled}>
			<FieldLegend>{question.prompt}</FieldLegend>
			<QuestionList>
				{options.map((o) => (
					<div key={o} className="py-1.5">
						<CheckboxPrimitive.Root
							checked={Array.isArray(answer) && answer.includes(o)}
							onCheckedChange={() => toggle(o)}
							disabled={disabled}
							asChild
						>
							<QuestionOption variant="multi" label={o} />
						</CheckboxPrimitive.Root>
					</div>
				))}
			</QuestionList>
		</FieldSet>
	);
};
