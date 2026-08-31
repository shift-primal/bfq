import { WarningCircleIcon } from "@phosphor-icons/react";
import { Link } from "@tanstack/react-router";
import { QuestionList } from "#/components/questions/QuestionList";
import { QuestionListItem } from "#/components/questions/QuestionListItem";
import { QuestionOption } from "#/components/questions/QuestionOption";
import { QuestionSummaryFieldSet } from "#/components/questions/QuestionSummaryFieldSet";
import { isAnswered } from "#/lib/questions.utils";
import { cn } from "#/lib/utils";
import type { ResultSelect, ShuffledQuestion } from "#/types/quiz.types";

type SelectQuestionSummaryProps =
	| { mode: "result"; question: ResultSelect }
	| {
			mode: "review";
			step: number;
			question: ShuffledQuestion;
			answer: string | undefined;
	  };

export const SelectQuestionSummary = (props: SelectQuestionSummaryProps) => {
	const { question } = props;
	const answer = props.mode === "result" ? props.question.answer : props.answer;
	const unanswered = props.mode === "review" && !isAnswered("select", answer);

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
			<QuestionList>
				{question.options.map((o) => (
					<QuestionListItem key={o}>
						<QuestionOption
							variant="select"
							label={o}
							isCorrectAnswer={
								props.mode === "result"
									? o === props.question.correct
									: undefined
							}
							isUserPick={o === answer}
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
