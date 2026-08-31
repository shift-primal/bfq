import { WarningIcon } from "@phosphor-icons/react";
import { Link } from "@tanstack/react-router";
import { QuestionSummaryFieldSet } from "#/components/QuestionSummaryFieldSet";
import { QuestionList } from "#/components/questions/QuestionList";
import { QuestionOption } from "#/components/questions/QuestionOption";
import { isOrderUntouched } from "#/lib/questions.utils";
import { cn } from "#/lib/utils";
import type { ShuffledQuestion } from "#/types/quiz.types";

export const ReviewOrderQuestion = ({
	step,
	question,
	answer,
}: {
	step: number;
	question: ShuffledQuestion;
	answer: string[] | undefined;
}) => {
	const order = answer ?? question.options;

	return (
		<Link
			to="/quiz/$step"
			params={{ step: String(step) }}
			className={cn(
				"block rounded-2xl transition-colors hover:bg-muted/50",
				isOrderUntouched(question.options, answer) &&
					"ring-2 ring-warning/50 hover:ring-warning",
			)}
		>
			<QuestionSummaryFieldSet
				prompt={question.prompt}
				questionType={question.type}
				indicator={
					isOrderUntouched(question.options, answer) && (
						<WarningIcon size={16} className="shrink-0 text-warning" />
					)
				}
			>
				<QuestionList>
					{order.map((o) => (
						<div key={o} className="p-1.5">
							<QuestionOption variant="order" label={o} isUserPick={false} />
						</div>
					))}
				</QuestionList>
			</QuestionSummaryFieldSet>
		</Link>
	);
};
