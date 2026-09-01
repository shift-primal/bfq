import type { ReactNode } from "react";

export const ScrollableContent = ({ children }: { children: ReactNode }) => (
	<div className="flex flex-1 flex-col overflow-x-hidden overflow-y-auto py-2">
		{children}
	</div>
);
