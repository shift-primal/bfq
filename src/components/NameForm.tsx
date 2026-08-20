import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { useShallow } from "zustand/react/shallow";
import { Navigation } from "#/components/Navigation";

import { Field, FieldDescription, FieldLabel } from "#/components/shadcn/field";
import { Input } from "#/components/shadcn/input";
import { getShuffledOrder } from "#/server/questions.rpc";
import { useQuizStore } from "#/store";

export const NameForm = () => {
	const { name, setName, setQuestions } = useQuizStore(
		useShallow((s) => ({
			name: s.name,
			setName: s.setName,
			setQuestions: s.setQuestions,
		})),
	);
	const navigate = useNavigate();

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

			<Navigation onBack={() => navigate({ to: "/" })} onNext={handleNext} />
		</div>
	);
};
