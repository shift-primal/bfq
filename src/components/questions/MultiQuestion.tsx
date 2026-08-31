import { Checkbox as CheckboxPrimitive } from "radix-ui";
import { QuestionFieldSet } from "#/components/questions/QuestionFieldSet";
import { QuestionList } from "#/components/questions/QuestionList";
import { QuestionListItem } from "#/components/questions/QuestionListItem";
import { QuestionOption } from "#/components/questions/QuestionOption";
import { useSound } from "#/hooks/use-sound";
import { useQuestionAnswer } from "#/hooks/useQuestionAnswer";
import { switch002Sound } from "#/lib/switch-002";
import type { MultiPublic } from "#/types/quiz.types";

export const MultiQuestion = ({ question }: { question: MultiPublic }) => {
	const { answer, setAnswer, options } = useQuestionAnswer(
		question.id,
		question.options,
	);

	const selected = Array.isArray(answer) ? answer : [];
	const atMax =
		question.maxOptions !== undefined && selected.length >= question.maxOptions;

	const [play] = useSound(switch002Sound);

	const toggle = (option: string) => {
		const isSelected = selected.includes(option);

		if (!isSelected && atMax) return;

		const next = isSelected
			? selected.filter((o) => o !== option)
			: [...selected, option];

		play({ volume: 0.5 });
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
						<QuestionListItem key={o}>
							<CheckboxPrimitive.Root
								checked={isSelected}
								onCheckedChange={() => toggle(o)}
								disabled={atMax && !isSelected}
								asChild
							>
								<QuestionOption variant="multi" label={o} />
							</CheckboxPrimitive.Root>
						</QuestionListItem>
					);
				})}
			</QuestionList>
		</QuestionFieldSet>
	);
};
