import { toPublic } from "#/lib/questions.utils";
import { questions } from "#/config/questions.data";
import { createServerFn } from "@tanstack/react-start";
import { shuffleArray } from "#/lib/utils";
import type { ShuffledQuestion } from "#/store";
import type { SubmittedAnswer } from "#/routes/quiz/review";
import { tallyScore } from "#/lib/scoring";
import { db } from "#/db";
import { submissions } from "#/db/schema";

export const getQuestion = createServerFn()
	.validator((step: number) => step)
	.handler(({ data: step }) => {
		const q = questions[step - 1];
		if (!q) throw new Error("Not found");
		return { question: toPublic(q), step, total: questions.length };
	});

export const getShuffledOrder = createServerFn().handler(() => {
	const result: Record<string, ShuffledQuestion> = {};

	for (const q of questions) {
		result[q.id] = {
			type: q.type,
			prompt: q.prompt,
			options: shuffleArray(q.type === "order" ? q.correctOrder : q.options),
		};
	}

	return result;
});

export const submitQuiz = createServerFn()
	.validator((data: { name: string; answers: SubmittedAnswer }) => data)
	.handler(async ({ data }) => {
		const score = tallyScore(questions, data.answers);
		const [row] = await db
			.insert(submissions)
			.values({ name: data.name, score, answers: data.answers })
			.returning();

		const rank = 1; // TODO: placeholder

		return { score, rank, id: row.id };
	});
