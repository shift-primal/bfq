import { CheckIcon } from "@phosphor-icons/react";
import type { ComponentProps } from "react";
import { cn } from "#/lib/utils";

type QuestionOptionProps = ComponentProps<"div"> & {
	variant: "select" | "multi" | "order";
	label: string;
};

export const QuestionOption = ({
	variant,
	label,
	className,
	children,
	...props
}: QuestionOptionProps) => (
	<div
		data-slot="question-option"
		className={cn(
			"group/option flex select-none items-center justify-between gap-2 rounded-2xl text-card-foreground border border-input bg-background px-3 py-2.5 transition-all duration-200 shadow-xs",
			"hover:bg-muted/50 active:scale-[0.98] data-[state=checked]:border-primary data-[state=checked]:bg-primary/5",
			"outline-none focus-visible:border-ring focus-visible:ring-1 focus-visible:ring-ring/30",
			"cursor-pointer",
			className,
		)}
		{...props}
	>
		<span className="flex min-w-0 items-center gap-2">
			{variant === "select" && (
				<span
					aria-hidden="true"
					className="flex size-4 shrink-0 items-center justify-center rounded-full border-2 border-input transition-all duration-200 group-data-[state=checked]/option:border-primary group-data-[state=checked]/option:ring-4 group-data-[state=checked]/option:ring-primary/15"
				>
					<span className="size-2 scale-0 rounded-full bg-primary opacity-0 transition-all duration-150 group-data-[state=checked]/option:scale-100 group-data-[state=checked]/option:opacity-100 group-data-[state=checked]/option:animate-radio-pop" />
				</span>
			)}

			{variant === "multi" && (
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

		{children}
	</div>
);
