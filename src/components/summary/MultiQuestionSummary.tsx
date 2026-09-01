import { WarningCircleIcon } from "@phosphor-icons/react";
import { Link } from "@tanstack/react-router";
import { QuestionList } from "#/components/questions/QuestionList";
import { QuestionListItem } from "#/components/questions/QuestionListItem";
import { QuestionOption } from "#/components/questions/QuestionOption";
import { QuestionSummaryFieldSet } from "#/components/questions/QuestionSummaryFieldSet";
import { isAnswered } from "#/lib/questions.utils";
import { cn } from "#/lib/utils";
import type { ResultMulti, ShuffledQuestion } from "#/types/quiz.types";

type MultiQuestionSummaryProps =
	| { mode: "result"; question: ResultMulti }
	| {
			mode: "review";
			step: number;
			question: ShuffledQuestion;
			answer: string[] | undefined;
	  };

export const MultiQuestionSummary = (props: MultiQuestionSummaryProps) => {
	const { question } = props;
	const answer = props.mode === "result" ? props.question.answer : props.answer;
	const unanswered = props.mode === "review" && !isAnswered("multi", answer);

	const content = (
		<QuestionSummaryFieldSet
			prompt={question.prompt}
			questionType={question.type}
			indicator={
				unanswered && (
					<span className="flex shrink-0 items-center gap-1 text-destructive">
						<WarningCircleIcon aria-hidden="true" size={16} />
						<span className="sr-only">Ubesvart.</span>
					</span>
				)
			}
		>
			<QuestionList slot="checkbox-group">
				{question.options.map((o) => (
					<QuestionListItem key={o}>
						<QuestionOption
							variant="multi"
							label={o}
							isCorrectAnswer={
								props.mode === "result"
									? props.question.correct.includes(o)
									: undefined
							}
							isUserPick={answer?.includes(o) ?? false}
						/>
					</QuestionListItem>
				))}
			</QuestionList>
		</QuestionSummaryFieldSet>
	);

	if (props.mode === "review") {
		return (
			<Link
				to="/quiz/$step"
				params={{ step: String(props.step) }}
				className={cn(
					"block rounded-2xl transition-colors hover:bg-muted/50",
					unanswered && "ring-2 ring-destructive/50 hover:ring-destructive",
				)}
			>
				{content}
			</Link>
		);
	}

	return content;
};
