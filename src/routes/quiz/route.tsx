import {
	createFileRoute,
	Outlet,
	useLocation,
	useParams,
} from "@tanstack/react-router";
import { ResetButton } from "#/components/ResetButton";
import { Progress } from "#/components/shadcn/progress";
import { getQuestionCount } from "#/server/questions.rpc";

const QuizLayout = () => {
	const { pathname } = useLocation();
	const { step: stepParam } = useParams({ strict: false });
	const questionCount = Route.useLoaderData();

	const total = questionCount + 1;
	const step =
		pathname === "/quiz/start"
			? 0
			: pathname === "/quiz/review"
				? total
				: stepParam !== undefined
					? Number(stepParam)
					: 0;

	return (
		<div className="flex flex-col gap-6 py-6">
			<div className="flex gap-x-4 items-center">
				<span className="w-fit text-sm font-medium text-muted-foreground tabular-nums">
					{step}/{total}
				</span>
				<Progress
					value={(step / total) * 100}
					aria-label="Fremgang"
					aria-valuetext={`Steg ${step} av ${total}`}
				/>
				<ResetButton />
			</div>
			<Outlet />
		</div>
	);
};

export const Route = createFileRoute("/quiz")({
	loader: () => getQuestionCount(),
	component: QuizLayout,
});
