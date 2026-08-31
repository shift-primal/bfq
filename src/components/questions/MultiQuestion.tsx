import { Checkbox as CheckboxPrimitive } from "radix-ui";
import { QuestionFieldSet } from "#/components/questions/QuestionFieldSet";
import { QuestionList } from "#/components/questions/QuestionList";
import { QuestionOption } from "#/components/questions/QuestionOption";
import { useQuestionAnswer } from "#/hooks/useQuestionAnswer";
import type { MultiPublic } from "#/types/quiz.types";

export const MultiQuestion = ({ question }: { question: MultiPublic }) => {
	const { answer, setAnswer, options } = useQuestionAnswer(
		question.id,
		question.options,
	);

	const selected = Array.isArray(answer) ? answer : [];
	const atMax =
		question.maxOptions !== undefined && selected.length >= question.maxOptions;

	const toggle = (option: string) => {
		const isSelected = selected.includes(option);

		if (!isSelected && atMax) return;

		const next = isSelected
			? selected.filter((o) => o !== option)
			: [...selected, option];

		setAnswer(question.id, next);
	};

	return (
		<QuestionFieldSet
			prompt={question.prompt}
			questionType="multi"
			maxOptions={question.maxOptions}
		>
			<QuestionList>
				{options.map((o) => {
					const isSelected = selected.includes(o);

					return (
						<div key={o} className="p-1.5">
							<CheckboxPrimitive.Root
								checked={isSelected}
								onCheckedChange={() => toggle(o)}
								disabled={atMax && !isSelected}
								asChild
							>
								<QuestionOption variant="multi" label={o} />
							</CheckboxPrimitive.Root>
						</div>
					);
				})}
			</QuestionList>
		</QuestionFieldSet>
	);
};
