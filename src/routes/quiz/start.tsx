import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "#/components/layout/PageShell";
import { NameForm } from "#/components/quiz/NameForm";

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
