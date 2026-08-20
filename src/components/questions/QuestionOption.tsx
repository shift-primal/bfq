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
			"group/option flex select-none items-center justify-between gap-2 rounded-lg border border-input bg-background px-3 py-2.5 transition-colors",
			"not-data-disabled:cursor-pointer data-disabled:cursor-default data-disabled:opacity-50 data-disabled:pointer-events-none",
			"hover:bg-muted/50 data-checked:border-primary/40 data-checked:bg-muted",
			"outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/30",
			className,
		)}
		{...props}
	>
		<span className="text-sm font-medium">{label}</span>

		{variant === "select" && (
			<span
				aria-hidden="true"
				className="flex size-4 shrink-0 items-center justify-center rounded-full border border-input group-data-checked/option:border-primary group-data-checked/option:bg-primary"
			>
				<span className="hidden size-2 rounded-full bg-primary-foreground group-data-checked/option:block" />
			</span>
		)}

		{variant === "multi" && (
			<span
				aria-hidden="true"
				className="flex size-4 shrink-0 items-center justify-center rounded-lg border border-input group-data-checked/option:border-primary group-data-checked/option:bg-primary"
			>
				<CheckIcon className="hidden size-3 text-primary-foreground group-data-checked/option:block" />
			</span>
		)}

		{children}
	</div>
);
