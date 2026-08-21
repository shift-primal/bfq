import { RadioGroup as RadioGroupPrimitive } from "radix-ui";
import { useShallow } from "zustand/react/shallow";
import { QuestionList } from "#/components/questions/QuestionList";
import { QuestionOption } from "#/components/questions/QuestionOption";
import { FieldLegend, FieldSet } from "#/components/shadcn/field";
import type { SelectPublic } from "#/config/questions.config";
import { useQuizStore } from "#/stores/quiz-store";

export const SelectQuestion = ({ question }: { question: SelectPublic }) => {
	const { answer, setAnswer, options } = useQuizStore(
		useShallow((s) => ({
			answer: s.answers[question.id],
			setAnswer: s.setAnswer,
			options: s.questions[question.id]?.options ?? question.options,
		})),
	);

	return (
		<FieldSet>
			<FieldLegend>{question.prompt}</FieldLegend>
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
		</FieldSet>
	);
};
