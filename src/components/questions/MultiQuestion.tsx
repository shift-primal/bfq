import { Checkbox as CheckboxPrimitive } from "radix-ui";
import { QuestionFieldSet } from "#/components/questions/QuestionFieldSet";
import { QuestionList } from "#/components/questions/QuestionList";
import { QuestionListItem } from "#/components/questions/QuestionListItem";
import { QuestionOption } from "#/components/questions/QuestionOption";
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

					return (
						<QuestionListItem key={o}>
							<CheckboxPrimitive.Root
								checked={isSelected}
								onCheckedChange={() => toggle(o)}
								disabled={isDisabled}
								asChild
							>
								{/* CheckboxPrimitive normally renders a native <button>,
								which is tabbable and responds to Space with no extra
								work. asChild swaps in this div, which loses both of
								those native behaviors, so they have to be set explicitly
								here. */}
								<QuestionOption
									variant="multi"
									label={o}
									tabIndex={isDisabled ? -1 : 0}
									onKeyDown={(e) => {
										if (e.key === " " && !isDisabled) {
											e.preventDefault();
											toggle(o);
											return;
										}
										// Checkbox has no group concept in Radix, so unlike
										// the radio group there's no roving focus to lean on
										// here — arrow-key movement between checkboxes has
										// to be done by hand.
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
							</CheckboxPrimitive.Root>
						</QuestionListItem>
					);
				})}
			</QuestionList>
		</QuestionFieldSet>
	);
};
