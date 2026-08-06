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

export const MultiQuestion = ({ question }: { question: MultiPublic }) => {
	const answer = useQuizStore((s) => s.answers[question.id]);
	const setAnswer = useQuizStore((s) => s.setAnswer);
	const options = useQuizStore((s) => s.order[question.id]) ?? question.options;

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
