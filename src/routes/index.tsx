import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "#/components/shadcn/button";

const Home = () => {
	return (
		<div className="flex flex-col items-center gap-y-4 py-16 text-center">
			<h1 className="text-2xl font-bold">Velkommen til quiz!</h1>
			<Button asChild>
				<Link to="/quiz/start">Gå til quiz</Link>
			</Button>
			<Button asChild variant="outline">
				<Link to="/leaderboard">Sjekk leaderboard</Link>
			</Button>
		</div>
	);
};

export const Route = createFileRoute("/")({ component: Home });
