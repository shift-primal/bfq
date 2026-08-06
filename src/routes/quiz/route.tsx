import { Progress } from "#/components/ui/progress";
import { TOTAL_QUESTIONS } from "#/config/questions.meta";
import {
	createFileRoute,
	Outlet,
	useLocation,
	useParams,
} from "@tanstack/react-router";

const QuizLayout = () => {
	const { pathname } = useLocation();
	const { step: stepParam } = useParams({ strict: false });

	const total = TOTAL_QUESTIONS + 1;
	const step =
		pathname === "/quiz/start"
			? 0
			: stepParam !== undefined
				? Number(stepParam) + 1
				: total;

	return (
		<div className="flex flex-col gap-6 p-6">
			<Progress value={(step / total) * 100} />
			<Outlet />
		</div>
	);
};

export const Route = createFileRoute("/quiz")({
	component: QuizLayout,
});
