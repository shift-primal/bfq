import { QuestionSummaryFieldSet } from "#/components/QuestionSummaryFieldSet";
import { QuestionList } from "#/components/questions/QuestionList";
import { QuestionOption } from "#/components/questions/QuestionOption";
import type { ResultOrder } from "#/types/quiz.types";

export const ResultOrderQuestion = ({
	question,
}: {
	question: ResultOrder;
}) => (
	<QuestionSummaryFieldSet
		prompt={question.prompt}
		questionType={question.type}
	>
		<div className="flex flex-col gap-y-4">
			<div>
				<p className="px-1.5 text-xs font-medium text-muted-foreground">
					Din rekkefølge
				</p>
				<QuestionList>
					{question.answer.map((id, i) => (
						<div key={id} className="p-1.5">
							<QuestionOption
								variant="order"
								label={id}
								isCorrectAnswer={question.correctOrder[i] === id}
								isUserPick
							/>
						</div>
					))}
				</QuestionList>
			</div>

			<div>
				<p className="px-1.5 text-xs font-medium text-muted-foreground">
					Riktig rekkefølge
				</p>
				<QuestionList>
					{question.correctOrder.map((id) => (
						<div key={id} className="p-1.5">
							<QuestionOption
								variant="order"
								label={id}
								isCorrectAnswer
								isUserPick={false}
							/>
						</div>
					))}
				</QuestionList>
			</div>
		</div>
	</QuestionSummaryFieldSet>
);
