import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { useShallow } from "zustand/react/shallow";
import { Navigation } from "#/components/Navigation";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from "#/components/shadcn/alert-dialog";

import { Field, FieldDescription, FieldLabel } from "#/components/shadcn/field";
import { Input } from "#/components/shadcn/input";
import { getShuffledOrder } from "#/server/questions.rpc";
import { useQuizStore } from "#/stores/quiz-store";

export const NameForm = () => {
	const { name, answers, setName, setQuestions, reset } = useQuizStore(
		useShallow((s) => ({
			name: s.name,
			answers: s.answers,
			setName: s.setName,
			setQuestions: s.setQuestions,
			reset: s.reset,
		})),
	);
	const navigate = useNavigate();
	const [confirmBackOpen, setConfirmBackOpen] = useState(false);

	const hasProgress = name.trim() !== "" || Object.keys(answers).length > 0;

	const handleBack = () => {
		if (hasProgress) {
			setConfirmBackOpen(true);
			return;
		}
		navigate({ to: "/" });
	};

	const handleNext = async () => {
		if (name.trim() === "") {
			toast.error("Du må fylle ut navnet ditt");
			return;
		}

		if (Object.keys(useQuizStore.getState().questions).length === 0) {
			const questions = await getShuffledOrder();
			setQuestions(questions);
		}

		navigate({ to: "/quiz/$step", params: { step: "1" } });
	};

	return (
		<div className="flex flex-col gap-6">
			<form
				className="flex flex-col gap-6"
				onSubmit={(e) => {
					e.preventDefault();
					handleNext();
				}}
			>
				<Field>
					<FieldLabel htmlFor="input-name">Navn</FieldLabel>
					<Input
						id="input-name"
						type="text"
						placeholder="Kasper..."
						value={name}
						onChange={(e) => setName(e.target.value)}
					/>
					<FieldDescription>
						Navnet ditt vil bli offentlig vist sammen med din score
					</FieldDescription>
				</Field>
			</form>

			<Navigation onBack={handleBack} onNext={handleNext} />

			<AlertDialog open={confirmBackOpen} onOpenChange={setConfirmBackOpen}>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>Er du sikker?</AlertDialogTitle>
						<AlertDialogDescription>
							Hvis du går tilbake mister du det du har fylt ut
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel>Avbryt</AlertDialogCancel>
						<AlertDialogAction
							variant="destructive"
							onClick={() => {
								reset();
								navigate({ to: "/" });
							}}
						>
							Fortsett
						</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</div>
	);
};
