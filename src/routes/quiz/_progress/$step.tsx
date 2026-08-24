import { createFileRoute, redirect } from "@tanstack/react-router";
import { Navigation } from "#/components/Navigation";
import { QuestionRenderer } from "#/components/questions/QuestionRenderer";
import { useStepNavigation } from "#/hooks/useStepNavigation";
import { getQuestion } from "#/server/questions.rpc";
import { useQuizStore } from "#/stores/quiz-store";

const QuestionStep = () => {
	const data = Route.useLoaderData();
	const { handleBack, handleNext } = useStepNavigation(data.step, data.total);

	return (
		<>
			<QuestionRenderer question={data.question} />
			<Navigation onBack={handleBack} onNext={handleNext} />
		</>
	);
};

export const Route = createFileRoute("/quiz/_progress/$step")({
	beforeLoad: () => {
		if (typeof window !== "undefined" && !useQuizStore.getState().name) {
			throw redirect({ to: "/quiz/start" });
		}
	},
	loader: ({ params }) => getQuestion({ data: Number(params.step) }),
	component: QuestionStep,
});
