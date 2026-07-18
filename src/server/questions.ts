import { questions } from "#/questions";
import { createServerFn } from "@tanstack/react-start";

export const getQuestion = createServerFn()
	.validator((step: number) => step)
	.handler(({ data: step }) => {
		const q = questions[step - 1];

		if (!q) throw new Error("Not found");

		if (q.type === "select")
			return { id: q.id, type: q.type, prompt: q.prompt, options: q.options };
		if (q.type === "multi")
			return { id: q.id, type: q.type, prompt: q.prompt, options: q.options };
		if (q.type === "order")
			return { id: q.id, type: q.type, prompt: q.prompt, items: q.items };
	});
