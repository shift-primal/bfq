import { createServerFn } from "@tanstack/react-start";
import { getCookie, setCookie } from "@tanstack/react-start/server";
import { questions } from "#/config/questions.data";
import { toPublic } from "#/lib/questions.utils";
import { shuffleArray } from "#/lib/utils";
import type { ShuffledQuestion } from "#/types/quiz.types";

export const getQuestion = createServerFn()
	.validator((step: number) => step)
	.handler(({ data: step }) => {
		const raw = getCookie("quiz-order");
		const order: string[] = raw ? JSON.parse(raw) : questions.map((q) => q.id);

		const q = questions.find((q) => q.id === order[step - 1]);
		if (!q) throw new Error("Not found");

		return { question: toPublic(q), step, total: order.length };
	});

export const getQuestionCount = createServerFn().handler(
	() => questions.length,
);

export const getShuffledOrder = createServerFn().handler(() => {
	const order = shuffleArray(questions.map((q) => q.id));

	setCookie("quiz-order", JSON.stringify(order), {
		httpOnly: true,
		sameSite: "lax",
		path: "/",
		maxAge: 60 * 60,
	});

	const questionsMap: Record<string, ShuffledQuestion> = {};

	for (const id of order) {
		const q = questions.find((q) => q.id === id);
		if (!q) throw new Error("Not found");

		questionsMap[q.id] = {
			type: q.type,
			prompt: q.prompt,
			options: shuffleArray(q.type === "order" ? q.correctOrder : q.options),
			maxOptions: q.type === "multi" ? q.maxOptions : undefined,
		};
	}

	return { questions: questionsMap, order };
});
