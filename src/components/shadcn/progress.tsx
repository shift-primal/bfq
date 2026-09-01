"use client";

import { Progress as ProgressPrimitive } from "@base-ui/react/progress";

import { cn } from "#/lib/utils";

function Progress({
	className,
	value,
	...props
}: ProgressPrimitive.Root.Props) {
	return (
		<ProgressPrimitive.Root
			data-slot="progress"
			value={value}
			className={cn(
				"relative flex h-3 w-full items-center overflow-x-hidden rounded-full bg-muted",
				className,
			)}
			{...props}
		>
			<ProgressPrimitive.Indicator
				data-slot="progress-indicator"
				className="h-full bg-primary transition-all"
			/>
		</ProgressPrimitive.Root>
	);
}

export { Progress };
