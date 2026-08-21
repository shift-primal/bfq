import { ResetButton } from "#/components/ResetButton";
import { Progress } from "#/components/shadcn/progress";
import { cn } from "#/lib/utils";
import { useQuizStore } from "#/stores/quiz-store";

export const QuizProgressBar = ({
	step,
	total,
}: {
	step: number;
	total: number;
}) => {
	const name = useQuizStore((s) => s.name);

	const hasName = name.length >= 1;

	return (
		<div className="flex flex-col items-center pb-2 gap-y-2">
			<div className="flex items-center justify-between w-full">
				<span
					className={cn(
						"line-clamp-1 shrink-0",
						!hasName && "text-muted-foreground",
					)}
				>
					{hasName ? name : "Navn..."}
				</span>
				<ResetButton />
			</div>
			<div className="flex gap-x-4 items-center w-full">
				<span className="w-fit text-sm font-medium text-muted-foreground tabular-nums">
					{step}/{total}
				</span>
				<Progress
					value={(step / total) * 100}
					aria-label="Fremgang"
					aria-valuetext={`Steg ${step} av ${total}`}
				/>
			</div>
		</div>
	);
};
