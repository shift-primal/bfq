import { QuestionSummaryFieldSet } from "#/components/QuestionSummaryFieldSet";
import { QuestionList } from "#/components/questions/QuestionList";
import { QuestionOption } from "#/components/questions/QuestionOption";
import type { ResultSelect } from "#/types/quiz.types";

export const ResultSelectQuestion = ({
	question,
}: {
	question: ResultSelect;
}) => (
	<QuestionSummaryFieldSet
		prompt={question.prompt}
		questionType={question.type}
	>
		<QuestionList>
			{question.options.map((o) => (
				<div key={o} className="p-1.5">
					<QuestionOption
						variant="select"
						label={o}
						isCorrectAnswer={o === question.correct}
						isUserPick={o === question.answer}
					/>
				</div>
			))}
		</QuestionList>
	</QuestionSummaryFieldSet>
);
