import { ResetButton } from "#/components/ResetButton";
import { Progress } from "#/components/shadcn/progress";
import { useQuizStore } from "#/stores/quiz-store";

export const QuizProgressBar = ({
	step,
	total,
}: {
	step: number;
	total: number;
}) => {
	const name = useQuizStore((s) => s.name);
	return (
		<div className="flex gap-x-4 items-center">
			<span>{name}</span>
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
	);
};
