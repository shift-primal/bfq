import { MultiQuestion } from "#/components/questions/Question.Multi";
import { OrderQuestion } from "#/components/questions/Question.Order";
import { SelectQuestion } from "#/components/questions/Question.Select";
import type { PublicQuestion } from "#/config/questions.config";

const RenderQuestion = ({ question }: { question: PublicQuestion }) => {
	switch (question.type) {
		case "select":
			return <SelectQuestion question={question} />;

		case "multi":
			return <MultiQuestion question={question} />;

		case "order":
			return <OrderQuestion question={question} />;
	}
};

export const QuestionRenderer = ({
	question,
}: {
	question: PublicQuestion;
}) => {
	return (
		<div>
			<p>{question.type}</p>
			<RenderQuestion question={question} />
		</div>
	);
};
