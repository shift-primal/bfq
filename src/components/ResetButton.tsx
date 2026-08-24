import { ArrowCounterClockwiseIcon } from "@phosphor-icons/react";
import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { ConfirmDialog } from "#/components/ConfirmDialog";
import { Button } from "#/components/shadcn/button";
import { useQuizStore } from "#/stores/quiz-store";

export const ResetButton = () => {
	const navigate = useNavigate();
	const reset = useQuizStore((s) => s.reset);
	const [dialogOpen, setDialogOpen] = useState(false);

	return (
		<ConfirmDialog
			open={dialogOpen}
			onOpenChange={setDialogOpen}
			trigger={
				<Button variant="destructive" aria-label="Start på nytt">
					<ArrowCounterClockwiseIcon />
				</Button>
			}
			title="Er du sikker?"
			description="Hvis du restarter så mister du alle svarene dine"
			confirmLabel="Fortsett"
			destructive
			onConfirm={() => {
				reset();
				navigate({ to: "/quiz/start" });
			}}
		/>
	);
};
