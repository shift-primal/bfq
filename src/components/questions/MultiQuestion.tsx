import { QuestionFieldSet } from "#/components/questions/QuestionFieldSet";
import { QuestionList } from "#/components/questions/QuestionList";
import { QuestionListItem } from "#/components/questions/QuestionListItem";
import { Checkbox } from "#/components/shadcn/checkbox";
import {
	Field,
	FieldContent,
	FieldLabel,
	FieldTitle,
} from "#/components/shadcn/field";
import { useAppSound } from "#/hooks/useAppSound";
import { useQuestionAnswer } from "#/hooks/useQuestionAnswer";
import type { MultiPublic } from "#/types/quiz.types";

export const MultiQuestion = ({ question }: { question: MultiPublic }) => {
	const { answer, setAnswer, options } = useQuestionAnswer(
		question.id,
		question.options,
	);

	const { playSelect, playDeselect } = useAppSound();

	const selected = Array.isArray(answer) ? answer : [];
	const atMax =
		question.maxOptions !== undefined && selected.length >= question.maxOptions;

	const toggle = (option: string) => {
		const isSelected = selected.includes(option);

		if (!isSelected && atMax) return;

		const next = isSelected
			? selected.filter((o) => o !== option)
			: [...selected, option];

		isSelected ? playDeselect() : playSelect();

		setAnswer(question.id, next);
	};

	return (
		<QuestionFieldSet
			prompt={question.prompt}
			questionType="multi"
			maxOptions={question.maxOptions}
		>
			<QuestionList slot="checkbox-group">
				{options.map((o) => {
					const isSelected = selected.includes(o);
					const isDisabled = atMax && !isSelected;
					const id = `${question.id}-${o}`;

					return (
						<QuestionListItem key={o}>
							<FieldLabel htmlFor={id}>
								<Field orientation="horizontal">
									<FieldContent>
										<FieldTitle>{o}</FieldTitle>
									</FieldContent>
									<Checkbox
										id={id}
										checked={isSelected}
										onCheckedChange={() => toggle(o)}
										disabled={isDisabled}
										onKeyDown={(e) => {
											// Checkbox has no group concept in Base UI, so
											// unlike the radio group there's no roving focus
											// to lean on here — arrow-key movement between
											// checkboxes has to be done by hand.
											if (e.key === "ArrowDown" || e.key === "ArrowUp") {
												e.preventDefault();
												const list = e.currentTarget.closest(
													'[data-slot="checkbox-group"]',
												);
												const items = list
													? [
															...list.querySelectorAll<HTMLElement>(
																'[role="checkbox"]',
															),
														]
													: [];
												const currentIndex = items.indexOf(e.currentTarget);
												const nextIndex =
													currentIndex + (e.key === "ArrowDown" ? 1 : -1);
												items[nextIndex]?.focus();
											}
										}}
									/>
								</Field>
							</FieldLabel>
						</QuestionListItem>
					);
				})}
			</QuestionList>
		</QuestionFieldSet>
	);
};
