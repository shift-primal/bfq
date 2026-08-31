import { MedalIcon } from "@phosphor-icons/react";
import type { ReactNode } from "react";
import { TableCell, TableRow } from "#/components/shadcn/table";
import { cn } from "#/lib/utils";

export type LeaderboardEntryProps = {
	id: string;
	name: string;
	score: number;
	rank: number;
	highlighted: boolean;
};

const MEDALS: Record<number, ReactNode> = {
	1: <MedalIcon aria-hidden="true" weight="fill" className="text-amber-400" />,
	2: <MedalIcon aria-hidden="true" weight="fill" className="text-slate-400" />,
	3: <MedalIcon aria-hidden="true" weight="fill" className="text-amber-700" />,
};

export const LeaderboardEntry = (props: LeaderboardEntryProps) => {
	return (
		<TableRow className={cn(props.highlighted && "border-2 border-warning")}>
			<TableCell className="font-medium flex items-center gap-x-4">
				{props.rank} {MEDALS[props.rank]}
			</TableCell>
			<TableCell>{props.name}</TableCell>
			<TableCell className="text-right">{props.score}</TableCell>
		</TableRow>
	);
};
