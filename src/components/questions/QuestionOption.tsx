import { CheckCircleIcon, XCircleIcon } from "@phosphor-icons/react";
import { cva } from "class-variance-authority";
import type { ComponentProps } from "react";
import { cn } from "#/lib/utils";

type QuestionOptionProps = ComponentProps<"div"> & {
	label: string;
	isCorrectAnswer?: boolean;
	isUserPick?: boolean;
};

type ResultState =
	| "none"
	| "correct"
	| "correct-pick"
	| "wrong-pick"
	| "neutral-pick";

const getResultState = (
	isCorrectAnswer: boolean | undefined,
	isUserPick: boolean | undefined,
): ResultState => {
	if (isUserPick === true && isCorrectAnswer === true) return "correct-pick";
	if (isUserPick === true && isCorrectAnswer === false) return "wrong-pick";
	if (isUserPick === true && isCorrectAnswer === undefined)
		return "neutral-pick";
	if (isCorrectAnswer === true) return "correct";
	return "none";
};

const optionVariants = cva(
	"group/option flex select-none items-center justify-between gap-2 rounded-2xl border border-input bg-background px-3 py-2.5 text-card-foreground shadow-xs outline-none transition-all duration-150 focus-visible:ring-2 focus-visible:ring-primary/50",
	{
		variants: {
			interactive: {
				true: "cursor-pointer hover:bg-muted/50 active:brightness-95 data-checked:border-primary data-checked:bg-primary/5 data-disabled:pointer-events-none data-disabled:cursor-not-allowed data-disabled:opacity-50 data-disabled:hover:bg-background",
				false: "",
			},
			result: {
				none: "",
				correct: "border-success/40 bg-success/10",
				"correct-pick":
					"border-success/40 bg-success/10 ring-2 ring-success/40",
				"wrong-pick":
					"border-destructive/40 bg-destructive/10 ring-2 ring-destructive/30",
				"neutral-pick": "border-primary/40 bg-primary/5 ring-2 ring-primary/20",
			},
		},
	},
);

export const QuestionOption = ({
	label,
	isCorrectAnswer,
	isUserPick,
	className,
	children,
	...props
}: QuestionOptionProps) => {
	const isResult = isCorrectAnswer !== undefined || isUserPick !== undefined;
	const result = getResultState(isCorrectAnswer, isUserPick);

	return (
		<div
			data-slot="question-option"
			className={cn(
				optionVariants({ interactive: !isResult, result }),
				className,
			)}
			{...props}
		>
			<span className="flex min-w-0 items-center gap-2">
				<span className="truncate text-sm font-medium">{label}</span>
			</span>

			{(result === "correct" || result === "correct-pick") && (
				<span className="sr-only">Riktig svar.</span>
			)}
			{result === "wrong-pick" && (
				<span className="sr-only">Feil svar, du valgte dette.</span>
			)}
			{result === "neutral-pick" && <span className="sr-only">Ditt svar.</span>}

			{result === "correct-pick" && (
				<CheckCircleIcon
					aria-hidden="true"
					weight="fill"
					className="size-4 shrink-0 text-success"
				/>
			)}
			{result === "wrong-pick" && (
				<XCircleIcon
					aria-hidden="true"
					weight="fill"
					className="size-4 shrink-0 text-destructive"
				/>
			)}

			{children}
		</div>
	);
};
