import { WarningIcon } from "@phosphor-icons/react";
import { Link } from "@tanstack/react-router";
import { QuestionList } from "#/components/questions/QuestionList";
import { QuestionListItem } from "#/components/questions/QuestionListItem";
import { QuestionOption } from "#/components/questions/QuestionOption";
import { QuestionSummaryFieldSet } from "#/components/questions/QuestionSummaryFieldSet";
import { isOrderUntouched } from "#/lib/questions.utils";
import { cn } from "#/lib/utils";
import type { ResultOrder, ShuffledQuestion } from "#/types/quiz.types";

type OrderQuestionSummaryProps =
	| { mode: "result"; question: ResultOrder }
	| {
			mode: "review";
			step: number;
			question: ShuffledQuestion;
			answer: string[] | undefined;
	  };

export const OrderQuestionSummary = (props: OrderQuestionSummaryProps) => {
	if (props.mode === "result") {
		const { question } = props;
		const { answer, correctOrder } = question;

		return (
			<QuestionSummaryFieldSet
				prompt={question.prompt}
				questionType={question.type}
			>
				<div className="flex flex-col gap-y-4">
					<div>
						<p className="px-1.5 text-xs font-medium text-muted-foreground">
							Din rekkefølge
						</p>
						<QuestionList slot="sortable-group">
							{answer.map((id, i) => (
								<QuestionListItem key={id}>
									<QuestionOption
										label={id}
										isCorrectAnswer={correctOrder[i] === id}
										isUserPick
									/>
								</QuestionListItem>
							))}
						</QuestionList>
					</div>

					<div>
						<p className="px-1.5 text-xs font-medium text-muted-foreground">
							Riktig rekkefølge
						</p>
						<QuestionList slot="sortable-group">
							{correctOrder.map((id) => (
								<QuestionListItem key={id}>
									<QuestionOption
										label={id}
										isCorrectAnswer
										isUserPick={false}
									/>
								</QuestionListItem>
							))}
						</QuestionList>
					</div>
				</div>
			</QuestionSummaryFieldSet>
		);
	}

	const { question } = props;
	const untouched = isOrderUntouched(question.options, props.answer);
	const order = props.answer ?? question.options;

	return (
		<Link
			to="/quiz/$step"
			params={{ step: String(props.step) }}
			className={cn(
				"block rounded-2xl transition-colors hover:bg-muted/50",
				untouched && "ring-2 ring-warning/50 hover:ring-warning",
			)}
		>
			<QuestionSummaryFieldSet
				prompt={question.prompt}
				questionType={question.type}
				indicator={
					untouched && (
						<span className="flex shrink-0 items-center gap-1 text-warning">
							<WarningIcon aria-hidden="true" size={16} />
							<span className="sr-only">Ikke endret rekkefølge.</span>
						</span>
					)
				}
			>
				<QuestionList slot="sortable-group">
					{order.map((o) => (
						<QuestionListItem key={o}>
							<QuestionOption label={o} isUserPick={false} />
						</QuestionListItem>
					))}
				</QuestionList>
			</QuestionSummaryFieldSet>
		</Link>
	);
};
