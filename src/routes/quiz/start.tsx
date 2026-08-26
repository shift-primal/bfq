import { createFileRoute } from "@tanstack/react-router";
import { NameForm } from "#/components/NameForm";

const QuizStart = () => {
	return (
		<div className="flex h-[calc(100dvh-var(--header-h))] flex-col overflow-hidden py-6">
			<NameForm />
		</div>
	);
};

export const Route = createFileRoute("/quiz/start")({
	component: QuizStart,
});
