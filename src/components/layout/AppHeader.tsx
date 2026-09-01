import { HouseIcon, ListChecksIcon, TrophyIcon } from "@phosphor-icons/react";
import { Link, useNavigate } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { SoundToggle } from "#/components/layout/SoundToggle";
import { ThemeToggle } from "#/components/layout/ThemeToggle";
import { Button } from "#/components/shadcn/button";
import { useAppSound } from "#/hooks/useAppSound";
import { useQuizResumeTarget } from "#/hooks/useQuizResumeTarget";

const HeaderNavButton = ({
	to,
	label,
	icon,
}: {
	to: "/" | "/leaderboard";
	label: string;
	icon: ReactNode;
}) => {
	const navigate = useNavigate();
	const { playSelect } = useAppSound();

	return (
		<Button
			variant="ghost"
			size="icon"
			aria-label={label}
			onClick={() => {
				playSelect();
				navigate({ to });
			}}
		>
			{icon}
		</Button>
	);
};

const QuizNavButton = () => {
	const target = useQuizResumeTarget();
	const { playSelect } = useAppSound();

	return (
		<Button
			variant="ghost"
			size="icon"
			aria-label="Quiz"
			onClick={() => playSelect()}
			render={<Link {...target} />}
		>
			<ListChecksIcon aria-hidden="true" />
		</Button>
	);
};

export const AppHeader = () => (
	<header className="fixed inset-x-0 top-0 z-50 flex h-(--header-h) justify-center border-b bg-background/80 backdrop-blur-sm">
		<div className="flex w-full max-w-2xl items-center justify-between px-4 sm:px-6 lg:px-8">
			<div className="flex items-center gap-x-1">
				<HeaderNavButton
					to="/"
					label="Hjem"
					icon={<HouseIcon aria-hidden="true" />}
				/>
				<QuizNavButton />
				<HeaderNavButton
					to="/leaderboard"
					label="Ledertavle"
					icon={<TrophyIcon aria-hidden="true" />}
				/>
			</div>
			<div>
				<SoundToggle />
				<ThemeToggle />
			</div>
		</div>
	</header>
);
