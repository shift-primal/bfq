import { NameForm } from "#/components/NameForm";
import { createFileRoute } from "@tanstack/react-router";

const QuizStart = () => {
	return <NameForm />;
};

export const Route = createFileRoute("/quiz/start")({
	component: QuizStart,
});
