import { createFileRoute, Outlet } from "@tanstack/react-router";
import { QuizProgressBar } from "#/components/QuizProgressBar";
import { useQuizStep } from "#/hooks/useQuizStep";
import { getQuestionCount } from "#/server/questions.rpc";

const QuizLayout = () => {
	const questionCount = Route.useLoaderData();
	const { step, total } = useQuizStep(questionCount);

	return (
		<div className="flex h-[calc(100dvh-var(--header-h))] flex-col gap-6 overflow-y-hidden py-6">
			<QuizProgressBar step={step} total={total} />
			<div className="flex flex-1 flex-col overflow-y-hidden">
				<Outlet />
			</div>
		</div>
	);
};

export const Route = createFileRoute("/quiz/_progress")({
	loader: () => getQuestionCount(),
	component: QuizLayout,
});
