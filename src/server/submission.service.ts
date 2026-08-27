import { NeonDbError } from "@neondatabase/serverless";
import { questions } from "#/config/questions.data";
import { db } from "#/db";
import { submissions } from "#/db/schema";
import { tallyScore } from "#/lib/scoring";
import type { SubmittedAnswer } from "#/types/quiz.types";

async function insertWithUniqueName(
	baseName: string,
	score: number,
	answers: SubmittedAnswer,
	suffix?: number,
): Promise<string> {
	const name = suffix === undefined ? baseName : `${baseName} (${suffix})`;

	try {
		const [row] = await db
			.insert(submissions)
			.values({ name, score, answers })
			.returning();
		return row.id;
	} catch (err) {
		const isNameConflict =
			err instanceof NeonDbError &&
			err.code === "23505" &&
			err.constraint === "submissions_name_unique";

		if (!isNameConflict) throw err;

		return insertWithUniqueName(baseName, score, answers, (suffix ?? 1) + 1);
	}
}

export async function insertSubmission(data: {
	name: string;
	answers: SubmittedAnswer;
}) {
	const score = Math.round(tallyScore(questions, data.answers));
	return insertWithUniqueName(data.name.trim(), score, data.answers);
}
