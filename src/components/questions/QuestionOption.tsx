import { CheckCircleIcon, CheckIcon, XCircleIcon } from "@phosphor-icons/react";
import type { ComponentProps } from "react";
import { cn } from "#/lib/utils";

type QuestionOptionProps = ComponentProps<"div"> & {
	variant: "select" | "multi" | "order";
	label: string;
	isCorrectAnswer?: boolean;
	isUserPick?: boolean;
};

export const QuestionOption = ({
	variant,
	label,
	isCorrectAnswer,
	isUserPick,
	className,
	children,
	...props
}: QuestionOptionProps) => {
	const isResult = isCorrectAnswer !== undefined || isUserPick !== undefined;
	const pickWasCorrect = isUserPick === true && isCorrectAnswer === true;
	const pickWasWrong = isUserPick === true && isCorrectAnswer === false;
	const pickIsNeutral = isUserPick === true && isCorrectAnswer === undefined;

	return (
		<div
			data-slot="question-option"
			className={cn(
				"group/option flex select-none items-center justify-between gap-2 rounded-2xl text-card-foreground border border-input bg-background px-3 py-2.5 transition-all duration-200 shadow-xs",
				"outline-none focus-visible:border-ring focus-visible:ring-1 focus-visible:ring-ring/30",
				!isResult &&
					"cursor-pointer hover:bg-muted/50 active:scale-[0.98] data-[state=checked]:border-primary data-[state=checked]:bg-primary/5",
				isCorrectAnswer && "border-success/40 bg-success/10",
				pickWasCorrect && "ring-2 ring-success/40",
				pickWasWrong &&
					"border-destructive/40 bg-destructive/10 ring-2 ring-destructive/30",
				pickIsNeutral &&
					"border-primary/40 bg-primary/5 ring-2 ring-primary/20",
				className,
			)}
			{...props}
		>
			<span className="flex min-w-0 items-center gap-2">
				{!isResult && variant === "select" && (
					<span
						aria-hidden="true"
						className="flex size-4 shrink-0 items-center justify-center rounded-full border-2 border-input transition-all duration-200 group-data-[state=checked]/option:border-primary group-data-[state=checked]/option:ring-4 group-data-[state=checked]/option:ring-primary/15"
					>
						<span className="size-2 scale-0 rounded-full bg-primary opacity-0 transition-all duration-150 group-data-[state=checked]/option:scale-100 group-data-[state=checked]/option:opacity-100 group-data-[state=checked]/option:animate-radio-pop" />
					</span>
				)}

				{!isResult && variant === "multi" && (
					<span
						aria-hidden="true"
						className="flex size-4 shrink-0 items-center justify-center rounded-lg border-2 border-input transition-all duration-200 group-data-[state=checked]/option:border-primary group-data-[state=checked]/option:bg-primary group-data-[state=checked]/option:animate-check-pop"
					>
						<CheckIcon
							weight="bold"
							className="size-3 text-primary-foreground opacity-0 transition-opacity delay-100 duration-150 group-data-[state=checked]/option:opacity-100"
						/>
					</span>
				)}

				<span className="truncate text-sm font-medium">{label}</span>
			</span>

			{pickWasCorrect && (
				<CheckCircleIcon
					weight="fill"
					className="size-4 shrink-0 text-success"
				/>
			)}
			{pickWasWrong && (
				<XCircleIcon
					weight="fill"
					className="size-4 shrink-0 text-destructive"
				/>
			)}

			{children}
		</div>
	);
};
