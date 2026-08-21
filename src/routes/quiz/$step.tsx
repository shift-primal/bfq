import { createFileRoute, redirect, useNavigate } from "@tanstack/react-router";
import { Navigation } from "#/components/Navigation";
import { QuestionRenderer } from "#/components/questions/QuestionRenderer";
import { ScrollableContent } from "#/components/ScrollableContent";
import { getQuestion } from "#/server/questions.rpc";
import { useQuizStore } from "#/stores/quiz-store";

const QuestionStep = () => {
	const data = Route.useLoaderData();
	const navigate = useNavigate();

	const handleBack = () => {
		if (data.step === 1) navigate({ to: "/quiz/start" });
		else
			navigate({ to: "/quiz/$step", params: { step: String(data.step - 1) } });
	};

	const handleNext = () => {
		if (data.step >= data.total) navigate({ to: "/quiz/review" });
		else {
			navigate({ to: "/quiz/$step", params: { step: String(data.step + 1) } });
		}
	};

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
