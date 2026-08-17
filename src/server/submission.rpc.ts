import { questions } from "#/config/questions.data";
import { db } from "#/db";
import { submissions } from "#/db/schema";
import { tallyScore } from "#/lib/scoring";
import type { SubmittedAnswer } from "#/routes/quiz/review";

export async function insertSubmission(data: {
	name: string;
	answers: SubmittedAnswer;
}) {
	const score = tallyScore(questions, data.answers);

	const [row] = await db
		.insert(submissions)
		.values({ name: data.name, score, answers: data.answers })
		.returning();

	return row.id;
}
