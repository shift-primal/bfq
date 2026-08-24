import type { Answer, PublicQuestion, Question } from "#/types/quiz.types";

export function isAnswered(
	type: PublicQuestion["type"],
	answer: Answer | undefined,
): boolean {
	switch (type) {
		case "select":
			return typeof answer === "string" && answer !== "";
		case "multi":
			return Array.isArray(answer) && answer.length > 0;
		default:
			return true;
	}
}

export function isOrderUntouched(
	options: string[],
	answer: Answer | undefined,
): boolean {
	if (!Array.isArray(answer)) return true;
	return (
		answer.length === options.length &&
		answer.every((id, i) => id === options[i])
	);
}

export function toPublic(q: Question): PublicQuestion {
	switch (q.type) {
		case "select":
			return { id: q.id, type: q.type, prompt: q.prompt, options: q.options };
		case "multi":
			return { id: q.id, type: q.type, prompt: q.prompt, options: q.options };
		case "order":
			return { id: q.id, type: q.type, prompt: q.prompt };
	}
}
