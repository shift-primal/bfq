import { TableCell, TableRow } from "#/components/shadcn/table";
import { cn } from "#/lib/utils";

export type LeaderboardEntryProps = {
	id: string;
	name: string;
	score: number;
	rank: number;
	highlighted: boolean;
};

export const LeaderboardEntry = (props: LeaderboardEntryProps) => {
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
