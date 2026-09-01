import { createFileRoute, Outlet, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { PageLoader } from "#/components/layout/PageLoader";
import { PageShell } from "#/components/layout/PageShell";
import { QuizProgressBar } from "#/components/quiz/QuizProgressBar";
import { useQuizStep } from "#/hooks/useQuizStep";
import { useQuizStoreHydrated } from "#/hooks/useQuizStoreHydrated";
import { getQuestionCount } from "#/server/questions.rpc";
import { useQuizStore } from "#/stores/quiz-store";

const QuizLayout = () => {
	const questionCount = Route.useLoaderData();
	const { step, total } = useQuizStep(questionCount);

	const navigate = useNavigate();
	const name = useQuizStore((s) => s.name);
	const hasHydrated = useQuizStoreHydrated();

	useEffect(() => {
		if (hasHydrated && !name) {
			navigate({ to: "/quiz/start", replace: true });
		}
	}, [hasHydrated, name, navigate]);

	if (!hasHydrated || !name) {
		return (
			<PageShell>
				<PageLoader />
			</PageShell>
		);
	}

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
