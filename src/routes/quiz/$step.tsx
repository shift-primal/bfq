import { getQuestion } from "#/server/questions";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/quiz/$step")({
	loader: ({ params }) => getQuestion({ data: Number(params.step) }),
	component: RouteComponent,
});

function RouteComponent() {
	const question = Route.useLoaderData();

	return <div>{question?.prompt}</div>;
}
