import { questions } from "#/config/questions.data";
import { db } from "#/db";
import { submissions } from "#/db/schema";
import { tallyScore } from "#/lib/scoring";
import type { SubmittedAnswer } from "#/routes/quiz/review";

function findAvailableSuffix(
	baseName: string,
	names: Set<string>,
	n = 2,
): string {
	const candidate = `${baseName} (${n})`;
	return names.has(candidate)
		? findAvailableSuffix(baseName, names, n + 1)
		: candidate;
}

async function getUniqueName(baseName: string): Promise<string> {
	const existing = await db
		.select({ name: submissions.name })
		.from(submissions);
	const names = new Set(existing.map((r) => r.name));

	return names.has(baseName) ? findAvailableSuffix(baseName, names) : baseName;
}

export async function insertSubmission(data: {
	name: string;
	answers: SubmittedAnswer;
}) {
	const score = Math.round(tallyScore(questions, data.answers));
	const name = await getUniqueName(data.name.trim());

	const [row] = await db
		.insert(submissions)
		.values({ name, score, answers: data.answers })
		.returning();

	return row.id;
}
