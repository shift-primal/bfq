import { QuestionSummaryFieldSet } from "#/components/QuestionSummaryFieldSet";
import { QuestionList } from "#/components/questions/QuestionList";
import { QuestionOption } from "#/components/questions/QuestionOption";
import type { ResultMulti } from "#/types/quiz.types";

export const ResultMultiQuestion = ({
	question,
}: {
	question: ResultMulti;
}) => (
	<QuestionSummaryFieldSet
		prompt={question.prompt}
		questionType={question.type}
	>
		<QuestionList>
			{question.options.map((o) => (
				<div key={o} className="p-1.5">
					<QuestionOption
						variant="multi"
						label={o}
						isCorrectAnswer={question.correct.includes(o)}
						isUserPick={question.answer.includes(o)}
					/>
				</div>
			))}
		</QuestionList>
	</QuestionSummaryFieldSet>
);
