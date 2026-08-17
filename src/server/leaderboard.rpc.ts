import { db } from "#/db";
import { submissions } from "#/db/schema";
import { createServerFn } from "@tanstack/react-start";
import { asc, desc, sql } from "drizzle-orm";

export const getLeaderboard = createServerFn().handler(async () => {
	return await db
		.select({
			id: submissions.id,
			name: submissions.name,
			score: submissions.score,
			rank: sql<number>`RANK() OVER (ORDER BY ${submissions.score} DESC, created_at ASC)`,
		})
		.from(submissions)
		.orderBy(desc(submissions.score), asc(submissions.created_at));
});
