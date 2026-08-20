import { useHotkey } from "@tanstack/react-hotkeys";
import { useNavigate } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, RefreshCcw } from "lucide-react";
import { useState } from "react";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "#/components/shadcn/alert-dialog";
import { Button } from "#/components/shadcn/button";
import { useQuizStore } from "#/store";

export const Navigation = ({
	onBack,
	onNext,
}: {
	onBack: () => void;
	onNext: () => void;
}) => {
	const reset = useQuizStore((s) => s.reset);
	const navigate = useNavigate();

	const [dialogOpen, setDialogOpen] = useState(false);

	useHotkey("ArrowLeft", () => {
		if (dialogOpen) return;
		onBack();
	});

	useHotkey("ArrowRight", () => {
		if (dialogOpen) return;
		onNext();
	});

	return (
		<div className="flex justify-between">
			<Button onClick={onBack} aria-label="Tilbake">
				<ArrowLeft />
			</Button>

			<AlertDialog open={dialogOpen} onOpenChange={setDialogOpen}>
				<AlertDialogTrigger asChild>
					<Button variant="destructive" aria-label="Start på nytt">
						<RefreshCcw />
					</Button>
				</AlertDialogTrigger>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>Er du sikker?</AlertDialogTitle>
						<AlertDialogDescription>
							Hvis du restarter så mister du alle svarene dine
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel>Cancel</AlertDialogCancel>
						<AlertDialogAction
							variant="destructive"
							onClick={() => {
								reset();
								navigate({ to: "/quiz/start" });
							}}
						>
							Continue
						</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>

			<Button onClick={onNext} aria-label="Neste">
				<ArrowRight />
			</Button>
		</div>
	);
};
