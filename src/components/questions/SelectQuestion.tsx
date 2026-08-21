import { RadioGroup as RadioGroupPrimitive } from "radix-ui";
import { QuestionFieldSet } from "#/components/questions/QuestionFieldSet";
import { QuestionList } from "#/components/questions/QuestionList";
import { QuestionOption } from "#/components/questions/QuestionOption";
import { useQuestionAnswer } from "#/hooks/useQuestionAnswer";
import type { SelectPublic } from "#/types/quiz.types";

export const SelectQuestion = ({ question }: { question: SelectPublic }) => {
	const { answer, setAnswer, options } = useQuestionAnswer(
		question.id,
		question.options,
	);

	return (
		<QuestionFieldSet prompt={question.prompt}>
			<RadioGroupPrimitive.Root
				value={typeof answer === "string" ? answer : ""}
				onValueChange={(value) => setAnswer(question.id, value)}
				className="flex w-full flex-col gap-3"
			>
				<QuestionList>
					{options.map((o) => (
						<div key={o} className="py-1.5">
							<RadioGroupPrimitive.Item value={o} asChild>
								<QuestionOption variant="select" label={o} />
							</RadioGroupPrimitive.Item>
						</div>
					))}
				</QuestionList>
			</RadioGroupPrimitive.Root>
		</QuestionFieldSet>
	);
};
