import type { ReactNode } from "react";

export const ScrollableContent = ({ children }: { children: ReactNode }) => (
	<div className="flex flex-1 flex-col justify-[safe_center] overflow-y-auto px-6 py-2">
		{children}
	</div>
);
