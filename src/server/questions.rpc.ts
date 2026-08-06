import { toPublic } from "#/lib/questions.utils";
import { questions } from "#/config/questions.data";
import { createServerFn } from "@tanstack/react-start";
import { shuffleArray } from "#/lib/utils";

export const getQuestion = createServerFn()
	.validator((step: number) => step)
	.handler(({ data: step }) => {
		const q = questions[step - 1];
		if (!q) throw new Error("Not found");
		return { question: toPublic(q), step, total: questions.length };
	});

export const getShuffledOrder = createServerFn().handler(() => {
	const order: Record<string, string[]> = {};
	for (const q of questions) {
		order[q.id] = shuffleArray(q.type === "order" ? q.correctOrder : q.options);
	}
	return order;
});
