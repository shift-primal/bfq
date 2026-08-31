import { RadioGroup as RadioGroupPrimitive } from "radix-ui";
import { QuestionFieldSet } from "#/components/questions/QuestionFieldSet";
import { QuestionList } from "#/components/questions/QuestionList";
import { QuestionListItem } from "#/components/questions/QuestionListItem";
import { QuestionOption } from "#/components/questions/QuestionOption";
import { useAppSound } from "#/hooks/useAppSound";
import { useQuestionAnswer } from "#/hooks/useQuestionAnswer";
import type { SelectPublic } from "#/types/quiz.types";

export const SelectQuestion = ({ question }: { question: SelectPublic }) => {
	const { answer, setAnswer, options } = useQuestionAnswer(
		question.id,
		question.options,
	);

	const { playSelect } = useAppSound();

	return (
		<QuestionFieldSet prompt={question.prompt} questionType="select">
			<RadioGroupPrimitive.Root
				value={typeof answer === "string" ? answer : ""}
				onValueChange={(value) => {
					playSelect();
					setAnswer(question.id, value);
				}}
				className="flex w-full flex-col gap-y-3"
			>
				<QuestionList>
					{options.map((o) => (
						<QuestionListItem key={o}>
							<RadioGroupPrimitive.Item value={o} asChild>
								<QuestionOption variant="select" label={o} />
							</RadioGroupPrimitive.Item>
						</QuestionListItem>
					))}
				</QuestionList>
			</RadioGroupPrimitive.Root>
		</QuestionFieldSet>
	);
};
