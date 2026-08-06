import { NameForm } from "#/components/NameForm";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/quiz/start")({
	component: RouteComponent,
});

function RouteComponent() {
	return <NameForm />;
}
