import { ResetButton } from "#/components/quiz/ResetButton";
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
	const isReview = step === total;

	return (
		<div className="flex w-full flex-col gap-y-1.5 pb-2">
			<span className="sr-only" aria-live="polite" aria-atomic="true">
				{isReview ? "Oppsummering" : `Spørsmål ${step} av ${total - 1}`}
			</span>
			<div className="flex items-baseline justify-between gap-x-4">
				<span
					className={cn(
						"truncate text-sm font-medium",
						!hasName && "text-muted-foreground",
					)}
				>
					{hasName ? name : "Navn..."}
				</span>
				<span className="shrink-0 text-sm text-muted-foreground tabular-nums">
					{step}/{total}
				</span>
			</div>
			<div className="flex items-center gap-x-3">
				<Progress
					value={(step / total) * 100}
					aria-label="Fremgang"
					aria-valuetext={`Steg ${step} av ${total}`}
				/>
				<ResetButton />
			</div>
		</div>
	);
};
