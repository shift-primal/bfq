import { createFileRoute, Link } from "@tanstack/react-router";

const Home = () => {
	return (
		<>
			<h1>Velkommen til quiz!</h1>
			<Link to="/quiz/start">GÅ TIL QUIZ</Link>
		</>
	);
};

export const Route = createFileRoute("/")({ component: Home });
