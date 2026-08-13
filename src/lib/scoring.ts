import type { Question } from "#/config/questions.config";
import type { SubmittedAnswer } from "#/routes/quiz/review";
import type { Answer } from "#/store";

export type SelectQuestion = Extract<Question, { type: "select" }>;
export type MultiQuestion = Extract<Question, { type: "multi" }>;
export type OrderQuestion = Extract<Question, { type: "order" }>;

const scoreSelect = (
	question: SelectQuestion,
	answer: SelectQuestion["correct"],
) => (answer === question.correct ? 1 : 0);

const scoreMulti = (
	question: MultiQuestion,
	answer: MultiQuestion["correct"],
) => {
	const isExactMatch =
		new Set(answer).symmetricDifference(new Set(question.correct)).size === 0;

	if (isExactMatch) return question.correct.length;
	return 0;
};

function scoreAnswer(question: Question, answer: Answer | undefined): number {
	switch (question.type) {
		case "select":
			return typeof answer === "string" ? scoreSelect(question, answer) : 0;
		case "multi":
			return Array.isArray(answer) ? scoreMulti(question, answer) : 0;
		case "order":
			return Array.isArray(answer) ? scoreOrder(question, answer) : 0;
	}
}

export function tallyScore(questions: Question[], answers: SubmittedAnswer) {
	return questions.reduce(
		(total, q) => total + scoreAnswer(q, answers[q.id]),
		0,
	);
}
