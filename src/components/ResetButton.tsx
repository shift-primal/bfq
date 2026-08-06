import { Button } from "#/components/ui/button";
import { useQuizStore } from "#/store";
import { useNavigate } from "@tanstack/react-router";

export const ResetButton = () => {
	const reset = useQuizStore((s) => s.reset);
	const navigate = useNavigate();

	return (
		<Button
			variant="outline"
			onClick={() => {
				reset();
				navigate({ to: "/quiz/start" });
			}}
		>
			Reset
		</Button>
	);
};
