import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { QuestionRenderer } from "#/components/questions/QuestionRenderer";
import { Navigation } from "#/components/quiz/Navigation";
import { useStepNavigation } from "#/hooks/useStepNavigation";
import { requireName } from "#/lib/require-name.guard";
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
			<Navigation
				onBack={handleBack}
				onNext={handleNext}
				currentStep={data.step}
			/>
		</>
	);
};

export const Route = createFileRoute("/quiz/_progress/$step")({
	beforeLoad: requireName,
	loader: ({ params }) => getQuestion({ data: Number(params.step) }),
	component: QuestionStep,
});
