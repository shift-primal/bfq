import { ArrowCounterClockwiseIcon } from "@phosphor-icons/react";
import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { ConfirmDialog } from "#/components/quiz/ConfirmDialog";
import { Button } from "#/components/shadcn/button";
import { useAppSound } from "#/hooks/useAppSound";
import { useQuizStore } from "#/stores/quiz-store";

export const ResetButton = () => {
	const navigate = useNavigate();
	const reset = useQuizStore((s) => s.reset);

	const { playWarn } = useAppSound();

	const [dialogOpen, setDialogOpen] = useState(false);

	return (
		<ConfirmDialog
			open={dialogOpen}
			onOpenChange={(v) => {
				!dialogOpen && playWarn();
				setDialogOpen(v);
			}}
			trigger={
				<Button variant="destructive" size="icon" aria-label="Start på nytt">
					<ArrowCounterClockwiseIcon aria-hidden="true" />
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
