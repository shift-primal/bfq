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
import type { PublicQuestion } from "#/config/questions.config";
import { isAnswered } from "#/lib/questions.utils";
import { useQuizStore } from "#/store";
import { useNavigate } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, RefreshCcw } from "lucide-react";
import { toast } from "sonner";

export const Navigation = ({
	step,
	total,
	question,
}: {
	step: number;
	total: number;
	question: PublicQuestion;
}) => {
	const answer = useQuizStore((s) => s.answers[question.id]);
	const navigate = useNavigate();

	const goBack = () => {
		if (step === 1) navigate({ to: "/quiz/start" });
		else navigate({ to: "/quiz/$step", params: { step: String(step - 1) } });
	};

	const goNext = () => {
		if (step >= total) navigate({ to: "/quiz/review" });
		else if (!isAnswered(question.type, answer)) {
			toast.error("Mangler svar");
		} else navigate({ to: "/quiz/$step", params: { step: String(step + 1) } });
	};

	const reset = useQuizStore((s) => s.reset);

	return (
		<div className="flex justify-between">
			<Button onClick={goBack}>
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

			<Button onClick={goNext}>
				<ArrowRight />
			</Button>
		</div>
	);
};
