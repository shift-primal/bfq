import { createFileRoute, redirect } from "@tanstack/react-router";
import { useEffect } from "react";
import { Navigation } from "#/components/Navigation";
import { QuestionRenderer } from "#/components/questions/QuestionRenderer";
import { useStepNavigation } from "#/hooks/useStepNavigation";
import { getQuestion } from "#/server/questions.rpc";
import { useQuizStore } from "#/stores/quiz-store";

const QuestionStep = () => {
	const data = Route.useLoaderData();
	const { handleBack, handleNext } = useStepNavigation(data.step, data.total);
	const setStep = useQuizStore((s) => s.setStep);

	useEffect(() => {
		setStep(data.step);
	}, [data.step, setStep]);

	return (
		<>
			<QuestionRenderer question={data.question} />
			<Navigation onBack={handleBack} onNext={handleNext} />
		</>
	);
};

export const Route = createFileRoute("/quiz/_progress/$step")({
	beforeLoad: async () => {
		if (typeof window === "undefined") return;

		let unsub: (() => void) | undefined;

		const hydrated = new Promise<void>((resolve) => {
			if (useQuizStore.persist.hasHydrated()) return resolve();
			unsub = useQuizStore.persist.onFinishHydration(() => resolve());
		});

		const timeout = new Promise<void>((resolve) => setTimeout(resolve, 3000));

		await Promise.race([hydrated, timeout]);
		unsub?.();

		if (!useQuizStore.getState().name) throw redirect({ to: "/quiz/start" });
	},
	loader: ({ params }) => getQuestion({ data: Number(params.step) }),
	component: QuestionStep,
});
