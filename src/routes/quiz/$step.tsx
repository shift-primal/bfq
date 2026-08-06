import { Navigation } from "#/components/questions/Navigation";
import { QuestionRenderer } from "#/components/questions/QuestionRenderer";
import { getQuestion } from "#/server/questions.rpc";
import { useQuizStore } from "#/store";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/quiz/$step")({
	beforeLoad: () => {
		if (typeof window !== "undefined" && !useQuizStore.getState().name) {
			throw redirect({ to: "/quiz/start" });
		}
	},
	loader: ({ params }) => getQuestion({ data: Number(params.step) }),
	component: RouteComponent,
});

function RouteComponent() {
	const data = Route.useLoaderData();

	return (
		<div className="flex flex-col gap-6">
			<QuestionRenderer question={data.question} />
			<Navigation
				step={data.step}
				total={data.total}
				question={data.question}
			/>
		</div>
	);
}
