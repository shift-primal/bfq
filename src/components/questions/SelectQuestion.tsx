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

	const handleSelect = (value: string) => {
		playSelect();
		setAnswer(question.id, value);
	};

	return (
		<QuestionFieldSet prompt={question.prompt} questionType="select">
			<RadioGroupPrimitive.Root
				value={typeof answer === "string" ? answer : ""}
				onValueChange={handleSelect}
				className="flex w-full flex-col gap-y-3"
			>
				<QuestionList slot="radio-group">
					{options.map((o) => (
						<QuestionListItem key={o}>
							<RadioGroupPrimitive.Item
								value={o}
								asChild
								onKeyDown={(e) => {
									// Radix's arrow-key auto-select relies on a ref that's
									// reset on keyup, which can race the roving-focus group's
									// setTimeout-deferred focus move and silently no-op even
									// for real (not just automated) keyboard input. Space/Enter
									// give keyboard users a reliable way to confirm a selection
									// regardless of whether that race landed.
									if (e.key === " " || e.key === "Enter") {
										e.preventDefault();
										handleSelect(o);
									}
								}}
							>
								<QuestionOption variant="select" label={o} />
							</RadioGroupPrimitive.Item>
						</QuestionListItem>
					))}
				</QuestionList>
			</RadioGroupPrimitive.Root>
		</QuestionFieldSet>
	);
};
