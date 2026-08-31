import { createServerFn } from "@tanstack/react-start";
import { questions } from "#/config/questions.data";
import { toPublic } from "#/lib/questions.utils";
import { shuffleArray } from "#/lib/utils";
import type { ShuffledQuestion } from "#/types/quiz.types";

export const getQuestion = createServerFn()
	.validator((step: number) => step)
	.handler(({ data: step }) => {
		const q = questions[step - 1];
		if (!q) throw new Error("Not found");
		return { question: toPublic(q), step, total: questions.length };
	});

export const getQuestionCount = createServerFn().handler(
	() => questions.length,
);

export const getShuffledOrder = createServerFn().handler(() => {
	const result: Record<string, ShuffledQuestion> = {};

	for (const q of questions) {
		result[q.id] = {
			type: q.type,
			prompt: q.prompt,
			options: shuffleArray(q.type === "order" ? q.correctOrder : q.options),
			maxOptions: q.type === "multi" ? q.maxOptions : undefined,
		};
	}

	return result;
});
