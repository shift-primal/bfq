import { createServerFn } from "@tanstack/react-start";
import { asc, desc, eq, sql } from "drizzle-orm";
import z from "zod";
import { db } from "#/db";
import { submissions } from "#/db/schema";
import { LEADERBOARD_PAGE_SIZE } from "#/lib/leaderboard.utils";

const rankedSubmissions = db.$with("ranked_submissions").as(
	db
		.select({
			id: submissions.id,
			rank: sql<number>`RANK() OVER (ORDER BY ${submissions.score} DESC, ${submissions.created_at} ASC)::int`.as(
				"rank",
			),
		})
		.from(submissions),
);

async function resolveHighlightPage(highlightId: string) {
	const [row] = await db
		.with(rankedSubmissions)
		.select({ rank: rankedSubmissions.rank })
		.from(rankedSubmissions)
		.where(eq(rankedSubmissions.id, highlightId));

	return row ? Math.ceil(row.rank / LEADERBOARD_PAGE_SIZE) : undefined;
}

export const getLeaderboard = createServerFn()
	.validator(
		z.object({
			page: z.number().int().min(1).optional(),
			highlight: z.string().optional(),
		}),
	)
	.handler(async ({ data }) => {
		const page =
			data.page ??
			(data.highlight
				? await resolveHighlightPage(data.highlight)
				: undefined) ??
			1;

		const [entries, [{ count }]] = await Promise.all([
			db
				.select({
					id: submissions.id,
					name: submissions.name,
					score: submissions.score,
					rank: sql<number>`RANK() OVER (ORDER BY ${submissions.score} DESC, created_at ASC)::int`,
				})
				.from(submissions)
				.orderBy(desc(submissions.score), asc(submissions.created_at))
				.limit(LEADERBOARD_PAGE_SIZE)
				.offset((page - 1) * LEADERBOARD_PAGE_SIZE),
			db.select({ count: sql<number>`COUNT(*)::int` }).from(submissions),
		]);

		return {
			entries,
			page,
			totalPages: Math.max(1, Math.ceil(count / LEADERBOARD_PAGE_SIZE)),
		};
	});
