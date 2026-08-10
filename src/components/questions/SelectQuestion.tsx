import {
	Field,
	FieldContent,
	FieldLabel,
	FieldTitle,
} from "#/components/shadcn/field";
import { RadioGroup, RadioGroupItem } from "#/components/shadcn/radio-group";
import type { SelectPublic } from "#/config/questions.config";
import { useQuizStore } from "#/store";
import { useShallow } from "zustand/react/shallow";

export const SelectQuestion = ({ question }: { question: SelectPublic }) => {
	const { answer, setAnswer, options } = useQuizStore(
		useShallow((s) => ({
			answer: s.answers[question.id],
			setAnswer: s.setAnswer,
			options: s.questions[question.id]?.order ?? question.options,
		})),
	);

	return (
		<div className="flex flex-col">
			<span>{question.prompt}</span>
			<RadioGroup
				value={typeof answer === "string" ? answer : ""}
				onValueChange={(value) => setAnswer(question.id, value)}
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
		</div>
	);
};
