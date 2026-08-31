import { NeonDbError } from "@neondatabase/serverless";
import { eq } from "drizzle-orm";
import { questions } from "#/config/questions.data";
import { db } from "#/db";
import { submissions } from "#/db/schema";
import { tallyScore } from "#/lib/scoring";
import type {
	Answer,
	Question,
	ResultQuestion,
	SubmissionResult,
	SubmittedAnswer,
} from "#/types/quiz.types";

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

function toResultQuestion(question: Question, answer: Answer): ResultQuestion {
	switch (question.type) {
		case "select":
			return {
				id: question.id,
				type: question.type,
				prompt: question.prompt,
				options: question.options,
				correct: question.correct,
				answer: typeof answer === "string" ? answer : "",
			};
		case "multi":
			return {
				id: question.id,
				type: question.type,
				prompt: question.prompt,
				options: question.options,
				correct: question.correct,
				answer: Array.isArray(answer) ? answer : [],
			};
		case "order":
			return {
				id: question.id,
				type: question.type,
				prompt: question.prompt,
				correctOrder: question.correctOrder,
				answer: Array.isArray(answer) ? answer : [],
			};
	}
}

export async function buildSubmissionResult(
	id: string,
): Promise<SubmissionResult | undefined> {
	const [row] = await db
		.select({
			name: submissions.name,
			score: submissions.score,
			answers: submissions.answers,
		})
		.from(submissions)
		.where(eq(submissions.id, id));

	if (!row) return undefined;

	return {
		name: row.name,
		score: row.score,
		questions: questions.map((q) => toResultQuestion(q, row.answers[q.id])),
	};
}
