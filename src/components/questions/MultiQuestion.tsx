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

	const toggle = (option: string) => {
		const current = Array.isArray(answer) ? answer : [];

		const next = current.includes(option)
			? current.filter((o) => o !== option)
			: [...current, option];

		setAnswer(question.id, next);
	};

	return (
		<QuestionFieldSet prompt={question.prompt}>
			<QuestionList>
				{options.map((o) => (
					<div key={o} className="py-1.5">
						<CheckboxPrimitive.Root
							checked={Array.isArray(answer) && answer.includes(o)}
							onCheckedChange={() => toggle(o)}
							asChild
						>
							<QuestionOption variant="multi" label={o} />
						</CheckboxPrimitive.Root>
					</div>
				))}
			</QuestionList>
		</QuestionFieldSet>
	);
};
