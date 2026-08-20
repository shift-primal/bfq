import type { PublicQuestion, Question } from "#/config/questions.config";
import type { Answer } from "#/stores/quiz-store";

export function isAnswered(
	type: PublicQuestion["type"],
	answer: Answer | undefined,
): boolean {
	switch (type) {
		case "select":
			return typeof answer === "string" && answer !== "";
		case "multi":
			return Array.isArray(answer) && answer.length > 0;
		case "order":
			return true;
	}
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
