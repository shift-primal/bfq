import { createFileRoute } from "@tanstack/react-router";
import { NameForm } from "#/components/NameForm";
import { PageShell } from "#/components/PageShell";

const QuizStart = () => {
	return (
		<PageShell>
			<NameForm />
		</PageShell>
	);
};

export const Route = createFileRoute("/quiz/start")({
	component: QuizStart,
});
