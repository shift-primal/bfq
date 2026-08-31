import { QuestionSummary } from "#/components/summary/QuestionSummary";
import type { ResultQuestion } from "#/types/quiz.types";

export const ResultRenderer = ({
	questions,
}: {
	questions: ResultQuestion[];
}) => (
	<div className="flex flex-col gap-y-4 p-1.5">
		{questions.map((q) => (
			<QuestionSummary key={q.id} mode="result" question={q} />
		))}
	</div>
);
