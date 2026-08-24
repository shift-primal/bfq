import type { ReactNode } from "react";

export const ErrorPage = ({
	title,
	description,
	actions,
}: {
	title: string;
	description: string;
	actions: ReactNode;
}) => {
	return (
		<div className="flex flex-col items-center gap-y-4 py-16 text-center">
			<h1 className="text-2xl font-bold">{title}</h1>
			<p className="text-muted-foreground">{description}</p>
			<div className="flex gap-x-2">{actions}</div>
		</div>
	);
};
