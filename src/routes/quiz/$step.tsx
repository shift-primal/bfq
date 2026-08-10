import { Navigation } from "#/components/Navigation";
import { QuestionRenderer } from "#/components/questions/QuestionRenderer";
import { getQuestion } from "#/server/questions.rpc";
import { useQuizStore } from "#/store";
import { createFileRoute, redirect } from "@tanstack/react-router";

const QuestionStep = () => {
	const data = Route.useLoaderData();

	return (
		<>
			<QuestionRenderer question={data.question} />
			<Navigation
				step={data.step}
				total={data.total}
				question={data.question}
			/>
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
