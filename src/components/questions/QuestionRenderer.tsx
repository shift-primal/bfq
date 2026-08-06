import { MultiQuestion } from "#/components/questions/MultiQuestion";
import { OrderQuestion } from "#/components/questions/OrderQuestion";
import { SelectQuestion } from "#/components/questions/SelectQuestion";
import type { PublicQuestion } from "#/config/questions.config";

const renderQuestion = (question: PublicQuestion) => {
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
	return renderQuestion(question);
};
