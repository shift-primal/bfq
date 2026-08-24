import { createFileRoute, Link } from "@tanstack/react-router";
import z from "zod";
import { LeaderboardEntry } from "#/components/leaderboard/LeaderboardEntry";
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
	const leaderboard = Route.useLoaderData();
	const { highlight } = Route.useSearch();

	return (
		<div className="flex flex-col gap-y-6 py-8">
			<h1 className="text-center text-2xl font-bold">Ledertavle</h1>

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
					{leaderboard.map((e) => (
						<LeaderboardEntry
							{...e}
							key={e.id}
							highlighted={e.id === highlight}
						/>
					))}
				</TableBody>
			</Table>

			<Button asChild variant="outline" className="self-center">
				<Link to="/">Tilbake til forsiden</Link>
			</Button>
		</div>
	);
};

export const Route = createFileRoute("/leaderboard")({
	component: Leaderboard,
	validateSearch: z.object({
		highlight: z.string().optional(),
	}),
	loader: async () => await getLeaderboard(),
});
