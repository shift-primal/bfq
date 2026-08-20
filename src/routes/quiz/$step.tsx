import { createFileRoute, redirect, useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { Navigation } from "#/components/Navigation";
import { QuestionRenderer } from "#/components/questions/QuestionRenderer";
import { isAnswered } from "#/lib/questions.utils";
import { getQuestion } from "#/server/questions.rpc";
import { useQuizStore } from "#/store";

const QuestionStep = () => {
	const data = Route.useLoaderData();
	const answer = useQuizStore((s) => s.answers[data.question.id]);
	const navigate = useNavigate();

	const handleBack = () => {
		if (data.step === 1) navigate({ to: "/quiz/start" });
		else
			navigate({ to: "/quiz/$step", params: { step: String(data.step - 1) } });
	};

	const handleNext = () => {
		if (data.step >= data.total) navigate({ to: "/quiz/review" });
		else if (!isAnswered(data.question.type, answer)) {
			toast.error("Mangler svar");
		} else {
			navigate({ to: "/quiz/$step", params: { step: String(data.step + 1) } });
		}
	};

	return (
		<>
			<QuestionRenderer question={data.question} />
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
