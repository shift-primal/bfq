import { useQuizStore } from "#/store";
import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Input } from "#/components/shadcn/input";
import { Navigation } from "#/components/Navigation";

import { Field, FieldDescription, FieldLabel } from "#/components/shadcn/field";
import { toast } from "sonner";
import { useShallow } from "zustand/react/shallow";
import { getShuffledOrder } from "#/server/questions.rpc";

export const NameForm = () => {
	const [nameState, setNameState] = useState(
		() => useQuizStore.getState().name,
	);
	const { setName, setQuestions } = useQuizStore(
		useShallow((s) => ({
			setName: s.setName,
			setQuestions: s.setQuestions,
		})),
	);
	const navigate = useNavigate();

	const handleNext = async () => {
		if (nameState.trim() === "") {
			toast.error("Du må fylle ut navnet ditt");
			return;
		}

		setName(nameState);

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
						value={nameState}
						onChange={(e) => setNameState(e.target.value)}
					/>
					<FieldDescription>
						Navnet ditt vil bli offentlig vist sammen med din score
					</FieldDescription>
				</Field>
			</form>

			<Navigation onBack={() => navigate({ to: "/" })} onNext={handleNext} />
		</div>
	);
};
