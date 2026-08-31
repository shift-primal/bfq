import { SpinnerIcon } from "@phosphor-icons/react";

export const PageLoader = () => {
	return (
		<div
			className="flex flex-col items-center justify-center gap-y-4 py-16 text-center"
			role="status"
			aria-label="Laster"
		>
			<SpinnerIcon className="size-8 animate-spin text-muted-foreground" />
		</div>
	);
};
