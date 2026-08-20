import { createFileRoute } from "@tanstack/react-router";
import z from "zod";
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "#/components/shadcn/table";
import { cn } from "#/lib/utils";
import { getLeaderboard } from "#/server/leaderboard.rpc";

type EntryProps = {
	id: string;
	name: string;
	score: number;
	rank: number;
	highlighted: boolean;
};

const LeaderboardEntry = (props: EntryProps) => {
	return (
		<TableRow
			className={cn(
				props.highlighted ? "border-2 border-amber-400" : "border-0",
			)}
		>
			<TableCell className="font-medium">{props.rank}</TableCell>
			<TableCell>{props.name}</TableCell>
			<TableCell className="text-right">{props.score}</TableCell>
		</TableRow>
	);
};

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
