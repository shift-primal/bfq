import { createFileRoute, Link, redirect } from "@tanstack/react-router";
import z from "zod";
import { LeaderboardEntry } from "#/components/leaderboard/LeaderboardEntry";
import { LeaderboardPagination } from "#/components/leaderboard/LeaderboardPagination";
import { ScrollableContent } from "#/components/ScrollableContent";
import { Button } from "#/components/shadcn/button";
import {
	Table,
	TableBody,
	TableCaption,
	TableHead,
	TableHeader,
	TableRow,
} from "#/components/shadcn/table";
import { getLeaderboard } from "#/server/leaderboard.rpc";

const Leaderboard = () => {
	const { entries, totalPages, page } = Route.useLoaderData();
	const { highlight } = Route.useSearch();

	return (
		<div className="flex h-[calc(100dvh-var(--header-h))] flex-col gap-y-6 py-8">
			<h1 className="shrink-0 text-center text-2xl font-bold">Ledertavle</h1>

			<ScrollableContent>
				<Table>
					<TableCaption>Poengsummene til alle deltakerne</TableCaption>
					<TableHeader>
						<TableRow>
							<TableHead className="w-20">Plassering</TableHead>
							<TableHead>Navn</TableHead>
							<TableHead className="text-right">Poeng</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{entries.map((e) => (
							<LeaderboardEntry
								{...e}
								key={e.id}
								highlighted={e.id === highlight}
							/>
						))}
					</TableBody>
				</Table>
			</ScrollableContent>

			<div className="flex shrink-0 flex-col items-center gap-y-4">
				<LeaderboardPagination page={page} totalPages={totalPages} />

				<Button asChild variant="outline">
					<Link to="/">Tilbake til forsiden</Link>
				</Button>
			</div>
		</div>
	);
};

export const Route = createFileRoute("/leaderboard")({
	component: Leaderboard,
	validateSearch: z.object({
		highlight: z.string().optional(),
		page: z.coerce.number().int().min(1).optional().catch(undefined),
	}),
	loaderDeps: ({ search }) => ({
		page: search.page,
		highlight: search.highlight,
	}),
	loader: async ({ deps, location }) => {
		const data = await getLeaderboard({ data: deps });

		if (deps.page && deps.page > data.totalPages) {
			throw redirect({
				to: location.pathname,
				search: (prev) => ({ ...prev, page: data.totalPages }),
			});
		}

		return data;
	},
});
