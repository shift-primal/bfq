import { TrophyIcon } from "@phosphor-icons/react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "#/components/shadcn/button";
import { useQuizResumeTarget } from "#/hooks/useQuizResumeTarget";
import { getQuestionCount } from "#/server/questions.rpc";

const Home = () => {
	const quizTarget = useQuizResumeTarget();
	const questionCount = Route.useLoaderData();

	return (
		<div className="relative flex min-h-[calc(100dvh-var(--header-h))] flex-col items-center justify-center overflow-hidden text-center">
			<div
				aria-hidden="true"
				className="-z-10 absolute top-1/2 left-1/2 size-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-3xl"
			/>

			<p className="text-sm font-medium text-muted-foreground">
				{questionCount} spørsmål · et par minutter
			</p>

			<h1 className="mt-3 font-display text-4xl font-semibold text-balance tracking-tight">
				Hvor godt kjenner du Kasper?
			</h1>

			<p className="mt-4 max-w-sm text-balance text-muted-foreground">
				En rask quiz om meg
			</p>

			<div className="mt-10 flex w-full max-w-xs flex-col gap-y-3">
				<Button asChild size="lg">
					<Link {...quizTarget}>Ta quizen</Link>
				</Button>
				<Button asChild variant="outline">
					<Link to="/leaderboard">
						<TrophyIcon />
						Se ledertavlen
					</Link>
				</Button>
			</div>
		</div>
	);
};

export const Route = createFileRoute("/")({
	component: Home,
	loader: () => getQuestionCount(),
});
