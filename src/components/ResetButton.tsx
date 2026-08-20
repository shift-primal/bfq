import { useNavigate } from "@tanstack/react-router";
import { RefreshCcw } from "lucide-react";
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
import { useQuizStore } from "#/stores/quiz-store";

export const ResetButton = () => {
	const navigate = useNavigate();
	const reset = useQuizStore((s) => s.reset);
	const [dialogOpen, setDialogOpen] = useState(false);

	return (
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
	);
};
