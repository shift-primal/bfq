import { TrophyIcon } from "@phosphor-icons/react";
import { createFileRoute, Link, redirect } from "@tanstack/react-router";
import z from "zod";
import { PageShell } from "#/components/layout/PageShell";
import { ScrollableContent } from "#/components/layout/ScrollableContent";
import { Button } from "#/components/shadcn/button";
import { ResultRenderer } from "#/components/summary/ResultRenderer";
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
				<Button
					variant="outline"
					render={<Link to="/leaderboard" search={{ highlight }} />}
				>
					<TrophyIcon aria-hidden="true" />
					Se ledertavlen
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
