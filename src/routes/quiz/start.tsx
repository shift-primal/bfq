import { createFileRoute } from "@tanstack/react-router";
import { NameForm } from "#/components/NameForm";

const QuizStart = () => {
	return <NameForm />;
};

export const Route = createFileRoute("/quiz/start")({
	component: QuizStart,
});
