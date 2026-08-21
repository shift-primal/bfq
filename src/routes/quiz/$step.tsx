import { createFileRoute, redirect } from "@tanstack/react-router";
import { Navigation } from "#/components/Navigation";
import { QuestionRenderer } from "#/components/questions/QuestionRenderer";
import { ScrollableContent } from "#/components/ScrollableContent";
import { useStepNavigation } from "#/hooks/useStepNavigation";
import { getQuestion } from "#/server/questions.rpc";
import { useQuizStore } from "#/stores/quiz-store";

const QuestionStep = () => {
	const data = Route.useLoaderData();
	const { handleBack, handleNext } = useStepNavigation(data.step, data.total);

	return (
		<>
			<ScrollableContent>
				<QuestionRenderer question={data.question} />
			</ScrollableContent>
			<Navigation onBack={handleBack} onNext={handleNext} />
		</>
	);
};

export const Route = createFileRoute("/quiz/$step")({
	beforeLoad: () => {
		if (typeof window !== "undefined" && !useQuizStore.getState().name) {
			throw redirect({ to: "/quiz/start" });
		}
	},
	loader: ({ params }) => getQuestion({ data: Number(params.step) }),
	component: QuestionStep,
});
