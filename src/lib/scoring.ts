import type { Question } from "#/config/questions.config";
import type { SubmittedAnswer } from "#/routes/quiz/review";

export type SelectQuestion = Extract<Question, { type: "select" }>;
export type MultiQuestion = Extract<Question, { type: "multi" }>;
export type OrderQuestion = Extract<Question, { type: "order" }>;

// Select

const scoreSelect = (
	question: SelectQuestion,
	answer: SelectQuestion["correct"],
): number => (answer === question.correct ? 1 : 0);

// Multi

const scoreMulti = (
	question: MultiQuestion,
	answer: MultiQuestion["correct"],
): number => {
	const isExactMatch =
		new Set(answer).symmetricDifference(new Set(question.correct)).size === 0;

	if (isExactMatch) return question.correct.length;

	const score = answer.reduce(
		(total, a) => total + (question.correct.includes(a) ? 0.5 : -0.5),
		0,
	);

	return Math.max(score, 0);
};

// Order

// stupid function to make biome shut the fuck up
function must<T>(value: T | undefined): T {
	if (value === undefined) throw new Error("Expected value to be defined");
	return value;
}

const getCorrectPairs = (
	items: OrderQuestion["correctOrder"],
	positions: Map<string, number>,
) =>
	items
		.flatMap((a, i) => items.slice(i + 1).map((b) => [a, b]))
		.filter(([a, b]) => must(positions.get(a)) < must(positions.get(b))).length;

const calculateScore = (cp: number, tp: number, to: number) => (cp / tp) * to;

const scoreOrder = (
	question: OrderQuestion,
	answer: OrderQuestion["correctOrder"],
): number => {
	const totalOptions = question.correctOrder.length;
	const totalPairs = (totalOptions * (totalOptions - 1)) / 2;
	const positions = new Map(question.correctOrder.map((o, i) => [o, i]));

	const correctPairs = getCorrectPairs(answer, positions);

	return calculateScore(correctPairs, totalPairs, totalOptions);
};

// Score all

function scoreAnswer(question: Question, answer: string | string[]): number {
	switch (question.type) {
		case "select":
			return typeof answer === "string" ? scoreSelect(question, answer) : 0;
		case "multi":
			return Array.isArray(answer) ? scoreMulti(question, answer) : 0;
		case "order":
			return Array.isArray(answer) ? scoreOrder(question, answer) : 0;
	}
}

// Tally

export function tallyScore(questions: Question[], answers: SubmittedAnswer) {
	return questions.reduce(
		(total, q) => total + scoreAnswer(q, answers[q.id]),
		0,
	);
}
