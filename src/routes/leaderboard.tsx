import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "#/components/shadcn/table";
import { getLeaderboard } from "#/server/leaderboard.rpc";
import { createFileRoute } from "@tanstack/react-router";

type EntryProps = {
	id: string;
	name: string;
	score: number;
	rank: number;
};

const LeaderboardEntry = (props: EntryProps) => {
	return (
		<TableRow>
			<TableCell className="font-medium">{props.rank}</TableCell>
			<TableCell>{props.name}</TableCell>
			<TableCell className="text-right">{props.score}</TableCell>
		</TableRow>
	);
};

const Leaderboard = () => {
	const leaderboard = Route.useLoaderData();

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
					<LeaderboardEntry {...e} key={e.id} />
				))}
			</TableBody>
		</Table>
	);
};

export const Route = createFileRoute("/leaderboard")({
	component: Leaderboard,
	loader: async () => await getLeaderboard(),
});
