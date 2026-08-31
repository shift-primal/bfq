import { createFileRoute, Outlet } from "@tanstack/react-router";
import { PageShell } from "#/components/layout/PageShell";
import { QuizProgressBar } from "#/components/quiz/QuizProgressBar";
import { useQuizStep } from "#/hooks/useQuizStep";
import { getQuestionCount } from "#/server/questions.rpc";

const QuizLayout = () => {
	const questionCount = Route.useLoaderData();
	const { step, total } = useQuizStep(questionCount);

	return (
		<PageShell>
			<QuizProgressBar step={step} total={total} />
			<div className="flex flex-1 flex-col overflow-y-hidden">
				<Outlet />
			</div>
		</PageShell>
	);
};

export const Route = createFileRoute("/quiz/_progress")({
	loader: () => getQuestionCount(),
	component: QuizLayout,
});
