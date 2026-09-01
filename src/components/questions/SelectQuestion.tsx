import { QuestionFieldSet } from "#/components/questions/QuestionFieldSet";
import { QuestionList } from "#/components/questions/QuestionList";
import { QuestionListItem } from "#/components/questions/QuestionListItem";
import {
	Field,
	FieldContent,
	FieldLabel,
	FieldTitle,
} from "#/components/shadcn/field";
import { RadioGroup, RadioGroupItem } from "#/components/shadcn/radio-group";
import { useAppSound } from "#/hooks/useAppSound";
import { useQuestionAnswer } from "#/hooks/useQuestionAnswer";
import type { SelectPublic } from "#/types/quiz.types";

export const SelectQuestion = ({ question }: { question: SelectPublic }) => {
	const { answer, setAnswer, options } = useQuestionAnswer(
		question.id,
		question.options,
	);

	const { playSelect } = useAppSound();

	const handleSelect = (value: string) => {
		playSelect();
		setAnswer(question.id, value);
	};

	return (
		<QuestionFieldSet prompt={question.prompt} questionType="select">
			<RadioGroup
				value={typeof answer === "string" ? answer : ""}
				onValueChange={handleSelect}
			>
				<QuestionList slot="radio-group">
					{options.map((o) => {
						const id = `${question.id}-${o}`;

						return (
							<QuestionListItem key={o}>
								<FieldLabel htmlFor={id}>
									<Field orientation="horizontal">
										<FieldContent>
											<FieldTitle>{o}</FieldTitle>
										</FieldContent>
										<RadioGroupItem value={o} id={id} />
									</Field>
								</FieldLabel>
							</QuestionListItem>
						);
					})}
				</QuestionList>
			</RadioGroup>
		</QuestionFieldSet>
	);
};
