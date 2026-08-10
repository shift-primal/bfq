import { Checkbox } from "#/components/shadcn/checkbox";
import {
	Field,
	FieldContent,
	FieldLabel,
	FieldLegend,
	FieldSet,
	FieldTitle,
} from "#/components/shadcn/field";
import type { MultiPublic } from "#/config/questions.config";
import { useQuizStore } from "#/store";
import { useShallow } from "zustand/react/shallow";

export const MultiQuestion = ({ question }: { question: MultiPublic }) => {
	const { answer, setAnswer, options } = useQuizStore(
		useShallow((s) => ({
			answer: s.answers[question.id],
			setAnswer: s.setAnswer,
			options: s.questions[question.id]?.order ?? question.options,
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
		<FieldSet>
			<FieldLegend>{question.prompt}</FieldLegend>
			{options.map((o) => (
				<FieldLabel key={o} htmlFor={o}>
					<Field orientation="horizontal">
						<FieldContent>
							<FieldTitle>{o}</FieldTitle>
						</FieldContent>
						<Checkbox
							id={o}
							checked={Array.isArray(answer) && answer.includes(o)}
							onCheckedChange={() => toggle(o)}
						/>
					</Field>
				</FieldLabel>
			))}
		</FieldSet>
	);
};
