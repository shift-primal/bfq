import { toPublic } from "#/lib/questions.utils";
import { questions } from "#/config/questions.data";
import { createServerFn } from "@tanstack/react-start";
import { shuffleArray } from "#/lib/utils";
import type { ShuffledQuestion } from "#/store";
import type { SubmittedAnswer } from "#/routes/quiz/review";
import { tallyScore } from "#/lib/scoring";
import { db } from "#/db";
import { submissions } from "#/db/schema";
import { desc } from "drizzle-orm";

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

const getRanking = async (score: number) => {
	const allSubmissions = await db
		.select({
			score: submissions.score,
		})
		.from(submissions)
		.orderBy(desc(submissions.score));

	const index = allSubmissions.findIndex((s) => score >= s.score);

	return index === -1 ? allSubmissions.length + 1 : index + 1;
};

export const submitQuiz = createServerFn()
	.validator((data: { name: string; answers: SubmittedAnswer }) => data)
	.handler(async ({ data }) => {
		console.log("submitQuiz data:", data);

		const score = tallyScore(questions, data.answers);

		// const [row] = await db
		// 	.insert(submissions)
		// 	.values({ name: data.name, score, answers: data.answers })
		// 	.returning();

		const rank = await getRanking(score);

		console.log(rank);

		// return { score, rank, id: row.id };
	});
