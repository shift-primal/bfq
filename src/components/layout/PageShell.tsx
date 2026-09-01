import type { ReactNode } from "react";
import { cn } from "#/lib/utils";

export const PageShell = ({
	className,
	children,
}: {
	className?: string;
	children: ReactNode;
}) => (
	<div
		className={cn(
			"flex h-[calc(100dvh-var(--header-h))] flex-col gap-6 overflow-y-hidden py-6 px-4",
			className,
		)}
	>
		{children}
	</div>
);
