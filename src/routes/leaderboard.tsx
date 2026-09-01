import { createFileRoute, Link, redirect } from "@tanstack/react-router";
import z from "zod";
import { PageShell } from "#/components/layout/PageShell";
import { ScrollableContent } from "#/components/layout/ScrollableContent";
import { LeaderboardEntry } from "#/components/leaderboard/LeaderboardEntry";
import { LeaderboardPagination } from "#/components/leaderboard/LeaderboardPagination";
import { Button } from "#/components/shadcn/button";
import {
	Table,
	TableBody,
	TableCaption,
	TableHead,
	TableHeader,
	TableRow,
} from "#/components/shadcn/table";
import { useAppSound } from "#/hooks/useAppSound";
import { getLeaderboard } from "#/server/leaderboard.rpc";

const Leaderboard = () => {
	const { entries, totalPages, page } = Route.useLoaderData();
	const { highlight } = Route.useSearch();
	const { playPrev } = useAppSound();

	return (
		<PageShell>
			<h1 className="shrink-0 text-center text-2xl font-medium">Ledertavle</h1>

			<ScrollableContent>
				{entries.length > 0 ? (
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
				) : (
					<div className="flex flex-col gap-y-4 items-center">
						<h2 className="text-xl font-medium">Ingen resultater enda!</h2>
						<p className="text-muted-foreground">
							Vær den første til å havne på ledertavlen!
						</p>
						<Button className="mt-2" render={<Link to="/quiz/start" />}>
							Gå til quiz
						</Button>
					</div>
				)}
			</ScrollableContent>

			<div className="flex shrink-0 flex-col items-center gap-y-4">
				<LeaderboardPagination page={page} totalPages={totalPages} />

				<Button
					variant="outline"
					onClick={() => playPrev()}
					render={<Link to="/" />}
				>
					Tilbake til forsiden
				</Button>
			</div>
		</PageShell>
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
