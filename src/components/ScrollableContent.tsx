import type { ReactNode } from "react";

export const ScrollableContent = ({ children }: { children: ReactNode }) => (
	<div className="flex flex-1 flex-col justify-[safe_center] overflow-y-auto">
		{children}
	</div>
);
