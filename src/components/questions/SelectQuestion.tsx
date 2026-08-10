import {
	Field,
	FieldContent,
	FieldLabel,
	FieldLegend,
	FieldSet,
	FieldTitle,
} from "#/components/shadcn/field";
import { RadioGroup, RadioGroupItem } from "#/components/shadcn/radio-group";
import type { SelectPublic } from "#/config/questions.config";
import { useQuizStore } from "#/store";
import { useShallow } from "zustand/react/shallow";

export const SelectQuestion = ({
	question,
	disabled = false,
}: {
	question: SelectPublic;
	disabled?: boolean;
}) => {
	const { answer, setAnswer, options } = useQuizStore(
		useShallow((s) => ({
			answer: s.answers[question.id],
			setAnswer: s.setAnswer,
			options: s.questions[question.id]?.options ?? question.options,
		})),
	);

	return (
		<FieldSet disabled={disabled}>
			<FieldLegend>{question.prompt}</FieldLegend>
			<RadioGroup
				value={typeof answer === "string" ? answer : ""}
				onValueChange={(value) => setAnswer(question.id, value)}
				disabled={disabled}
			>
				{options.map((o) => (
					<FieldLabel htmlFor={o} key={o}>
						<Field orientation="horizontal" className="cursor-pointer">
							<FieldContent>
								<FieldTitle>{o}</FieldTitle>
							</FieldContent>
							<RadioGroupItem value={o} id={o} />
						</Field>
					</FieldLabel>
				))}
			</RadioGroup>
		</FieldSet>
	);
};
