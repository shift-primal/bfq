import { MultiQuestionSummary } from "#/components/summary/MultiQuestionSummary";
import { OrderQuestionSummary } from "#/components/summary/OrderQuestionSummary";
import { SelectQuestionSummary } from "#/components/summary/SelectQuestionSummary";
import type {
	Answer,
	ResultQuestion,
	ShuffledQuestion,
} from "#/types/quiz.types";

type QuestionSummaryProps =
	| { mode: "result"; question: ResultQuestion }
	| {
			mode: "review";
			step: number;
			question: ShuffledQuestion;
			answer: Answer | undefined;
	  };

export const QuestionSummary = (props: QuestionSummaryProps) => {
	if (props.mode === "result") {
		const { question } = props;
		switch (question.type) {
			case "select":
				return <SelectQuestionSummary mode="result" question={question} />;
			case "multi":
				return <MultiQuestionSummary mode="result" question={question} />;
			case "order":
				return <OrderQuestionSummary mode="result" question={question} />;
		}
	}

	const { step, question, answer } = props;
	switch (question.type) {
		case "select":
			return (
				<SelectQuestionSummary
					mode="review"
					step={step}
					question={question}
					answer={answer as string | undefined}
				/>
			);
		case "multi":
			return (
				<MultiQuestionSummary
					mode="review"
					step={step}
					question={question}
					answer={answer as string[] | undefined}
				/>
			);
		case "order":
			return (
				<OrderQuestionSummary
					mode="review"
					step={step}
					question={question}
					answer={answer as string[] | undefined}
				/>
			);
	}
};
