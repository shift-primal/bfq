import {
	createFileRoute,
	Outlet,
	useLocation,
	useParams,
} from "@tanstack/react-router";
import { Progress } from "#/components/shadcn/progress";
import { useQuizStore } from "#/store";

const QuizLayout = () => {
	const { pathname } = useLocation();
	const { step: stepParam } = useParams({ strict: false });
	const options = useQuizStore((s) => s.questions);

	const total = Object.keys(options).length + 1;
	const step =
		pathname === "/quiz/start"
			? 0
			: stepParam !== undefined
				? Number(stepParam)
				: total;

	return (
		<div className="flex flex-col gap-6 py-6">
			<div className="flex flex-col gap-2">
				<Progress
					value={(step / total) * 100}
					aria-label="Fremgang"
					aria-valuetext={`Steg ${step} av ${total}`}
				/>
				<p className="w-fit text-xs font-medium text-muted-foreground tabular-nums">
					Steg {step} av {total}
				</p>
			</div>
			<Outlet />
		</div>
	);
};

export const Route = createFileRoute("/quiz")({
	component: QuizLayout,
});
