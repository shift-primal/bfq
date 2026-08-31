import { WarningCircleIcon } from "@phosphor-icons/react";
import { Link } from "@tanstack/react-router";
import { QuestionSummaryFieldSet } from "#/components/QuestionSummaryFieldSet";
import { QuestionList } from "#/components/questions/QuestionList";
import { QuestionOption } from "#/components/questions/QuestionOption";
import { isAnswered } from "#/lib/questions.utils";
import { cn } from "#/lib/utils";
import type { ShuffledQuestion } from "#/types/quiz.types";

export const ReviewMultiQuestion = ({
	step,
	question,
	answer,
}: {
	step: number;
	question: ShuffledQuestion;
	answer: string[] | undefined;
}) => (
	<Link
		to="/quiz/$step"
		params={{ step: String(step) }}
		className={cn(
			"block rounded-2xl transition-colors hover:bg-muted/50 ",
			!isAnswered("multi", answer) &&
				"ring-2 ring-destructive/50 hover:ring-destructive",
		)}
	>
		<QuestionSummaryFieldSet
			prompt={question.prompt}
			questionType={question.type}
			indicator={
				!isAnswered("multi", answer) && (
					<WarningCircleIcon size={16} className="shrink-0 text-destructive" />
				)
			}
		>
			<QuestionList>
				{question.options.map((o) => (
					<div key={o} className="p-1.5">
						<QuestionOption
							variant="multi"
							label={o}
							isUserPick={answer?.includes(o) ?? false}
						/>
					</div>
				))}
			</QuestionList>
		</QuestionSummaryFieldSet>
	</Link>
);
