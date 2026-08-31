import { TrophyIcon } from "@phosphor-icons/react";
import { createFileRoute, Link, redirect } from "@tanstack/react-router";
import z from "zod";
import { PageShell } from "#/components/PageShell";
import { ResultRenderer } from "#/components/result/ResultRenderer";
import { ScrollableContent } from "#/components/ScrollableContent";
import { Button } from "#/components/shadcn/button";
import { getSubmissionResult } from "#/server/submission.rpc";

const QuizResult = () => {
	const result = Route.useLoaderData();
	const { highlight } = Route.useSearch();

	return (
		<PageShell>
			<div className="shrink-0 text-center">
				<h1 className="text-2xl font-bold">Ferdig, {result.name}!</h1>
				<p className="mt-1 text-muted-foreground">
					Du fikk {result.score} poeng
				</p>
			</div>

			<ScrollableContent>
				<ResultRenderer questions={result.questions} />
			</ScrollableContent>

			<div className="flex shrink-0 justify-center">
				<Button asChild variant="outline">
					<Link to="/leaderboard" search={{ highlight }}>
						<TrophyIcon />
						Se ledertavlen
					</Link>
				</Button>
			</div>
		</PageShell>
	);
};

export const Route = createFileRoute("/quiz/result")({
	validateSearch: z.object({ highlight: z.string().optional() }),
	loaderDeps: ({ search }) => ({ highlight: search.highlight }),
	loader: ({ deps }) => {
		if (!deps.highlight) throw redirect({ to: "/" });
		return getSubmissionResult({ data: deps.highlight });
	},
	component: QuizResult,
});
