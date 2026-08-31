import { ResultMultiQuestion } from "#/components/result/ResultMultiQuestion";
import { ResultOrderQuestion } from "#/components/result/ResultOrderQuestion";
import { ResultSelectQuestion } from "#/components/result/ResultSelectQuestion";
import type { ResultQuestion } from "#/types/quiz.types";

const RenderResultQuestion = ({ question }: { question: ResultQuestion }) => {
	switch (question.type) {
		case "select":
			return <ResultSelectQuestion question={question} />;
		case "multi":
			return <ResultMultiQuestion question={question} />;
		case "order":
			return <ResultOrderQuestion question={question} />;
	}
};

export const ResultRenderer = ({
	questions,
}: {
	questions: ResultQuestion[];
}) => (
	<div className="flex flex-col gap-y-4 p-1.5">
		{questions.map((q) => (
			<RenderResultQuestion key={q.id} question={q} />
		))}
	</div>
);
