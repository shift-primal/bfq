import { CaretLeftIcon, CaretRightIcon } from "@phosphor-icons/react";
import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { Button } from "#/components/shadcn/button";
import { useAppSound } from "#/hooks/useAppSound";

const PagerButton = ({
	disabled,
	page,
	label,
	children,
}: {
	disabled: boolean;
	page: number;
	label: string;
	children: ReactNode;
}) => {
	const { playSelect } = useAppSound();

	if (disabled) {
		return (
			<Button variant="outline" size="icon" disabled aria-label={label}>
				{children}
			</Button>
		);
	}

	return (
		<Button asChild variant="outline" size="icon" onClick={() => playSelect()}>
			<Link
				to="/leaderboard"
				search={(prev) => ({ ...prev, page })}
				aria-label={label}
			>
				{children}
			</Link>
		</Button>
	);
};

export const LeaderboardPagination = ({
	page,
	totalPages,
}: {
	page: number;
	totalPages: number;
}) => {
	return (
		<div className="flex items-center justify-center gap-x-4">
			<PagerButton disabled={page <= 1} page={page - 1} label="Forrige side">
				<CaretLeftIcon aria-hidden="true" />
			</PagerButton>

			<span className="text-sm text-muted-foreground">
				Side {page} av {totalPages}
			</span>

			<PagerButton
				disabled={page >= totalPages}
				page={page + 1}
				label="Neste side"
			>
				<CaretRightIcon aria-hidden="true" />
			</PagerButton>
		</div>
	);
};
