import { useNavigate } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, RefreshCcw } from "lucide-react";
import { useEffect } from "react";
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

function useNavigationHotkeys(onBack: () => void, onNext: () => void) {
	useEffect(() => {
		const handler = (e: KeyboardEvent) => {
			const target = e.target as HTMLElement;
			const isTyping =
				target.tagName === "INPUT" ||
				target.tagName === "TEXTAREA" ||
				target.isContentEditable;
			if (isTyping) return;

			const isDialogOpen = document.querySelector(
				'[role="dialog"], [role="alertdialog"]',
			);
			if (isDialogOpen) return;

			if (e.key === "ArrowLeft") onBack();
			if (e.key === "ArrowRight") onNext();
		};

		window.addEventListener("keydown", handler);
		return () => window.removeEventListener("keydown", handler);
	}, [onBack, onNext]);
}

export const Navigation = ({
	onBack,
	onNext,
}: {
	onBack: () => void;
	onNext: () => void;
}) => {
	const reset = useQuizStore((s) => s.reset);
	const navigate = useNavigate();

	useNavigationHotkeys(onBack, onNext);

	return (
		<div className="flex justify-between">
			<Button onClick={onBack}>
				<ArrowLeft />
			</Button>

			<AlertDialog>
				<AlertDialogTrigger asChild>
					<Button variant="destructive">
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

			<Button onClick={onNext}>
				<ArrowRight />
			</Button>
		</div>
	);
};
