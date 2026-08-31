import { SpinnerIcon } from "@phosphor-icons/react";

export const PageLoader = () => {
	return (
		<div
			className="flex flex-col items-center justify-center gap-y-4 py-16 text-center"
			role="status"
			aria-label="Laster"
		>
			<SpinnerIcon
				aria-hidden="true"
				className="size-8 animate-spin text-muted-foreground"
			/>
		</div>
	);
};
