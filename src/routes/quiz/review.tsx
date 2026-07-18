import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/quiz/review")({
	component: RouteComponent,
});

function RouteComponent() {
	return <div>Hello "/quiz/review"!</div>;
}
