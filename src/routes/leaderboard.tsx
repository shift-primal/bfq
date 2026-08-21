import { createFileRoute } from "@tanstack/react-router";
import z from "zod";
import { LeaderboardEntry } from "#/components/leaderboard/LeaderboardEntry";
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
		<Table>
			<TableCaption>Leaderboard</TableCaption>
			<TableHeader>
				<TableRow>
					<TableHead className="w-20">Rank</TableHead>
					<TableHead>Name</TableHead>
					<TableHead className="text-right">Score</TableHead>
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
	);
};

export const Route = createFileRoute("/leaderboard")({
	component: Leaderboard,
	validateSearch: z.object({
		highlight: z.string().optional(),
	}),
	loader: async () => await getLeaderboard(),
});
