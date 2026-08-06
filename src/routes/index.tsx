import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
	return (
		<>
			<h1>Velkommen til quiz!</h1>
			<Link to="/quiz/start">GÅ TIL QUIZ</Link>
		</>
	);
}
