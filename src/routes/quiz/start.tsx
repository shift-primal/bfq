import { createFileRoute } from "@tanstack/react-router";
import { NameForm } from "#/components/NameForm";

const QuizStart = () => {
	return (
		<div className="flex h-dvh flex-col overflow-hidden py-6">
			<NameForm />
		</div>
	);
};

export const Route = createFileRoute("/quiz/start")({
	component: QuizStart,
});
