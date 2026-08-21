import type { Question, SubmittedAnswer } from "#/types/quiz.types";

export type ScoredSelectQuestion = Extract<Question, { type: "select" }>;
export type ScoredMultiQuestion = Extract<Question, { type: "multi" }>;
export type ScoredOrderQuestion = Extract<Question, { type: "order" }>;

// Select

const scoreSelect = (
	question: ScoredSelectQuestion,
	answer: ScoredSelectQuestion["correct"],
): number => (answer === question.correct ? 1 : 0);

// Multi

const scoreMulti = (
	question: ScoredMultiQuestion,
	answer: ScoredMultiQuestion["correct"],
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

// Narrows a Map.get() result so downstream numeric comparisons type-check.
function assertDefined<T>(value: T | undefined): T {
	if (value === undefined) throw new Error("Expected value to be defined");
	return value;
}

const getCorrectPairs = (
	items: ScoredOrderQuestion["correctOrder"],
	positions: Map<string, number>,
) =>
	items
		.flatMap((a, i) => items.slice(i + 1).map((b) => [a, b]))
		.filter(
			([a, b]) =>
				assertDefined(positions.get(a)) < assertDefined(positions.get(b)),
		).length;

const calculateScore = (cp: number, tp: number, to: number) => (cp / tp) * to;

const scoreOrder = (
	question: ScoredOrderQuestion,
	answer: ScoredOrderQuestion["correctOrder"],
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
