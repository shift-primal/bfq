import { getShuffledOrder } from "#/server/questions.rpc";
import { useQuizStore } from "#/store";
import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "#/components/shadcn/button";
import { Input } from "#/components/shadcn/input";

import { Field, FieldDescription, FieldLabel } from "#/components/shadcn/field";
import { toast } from "sonner";

export const NameForm = () => {
	const [name, setName] = useState(() => useQuizStore.getState().name);
	const storeName = useQuizStore((s) => s.setName);
	const setOrder = useQuizStore((s) => s.setOrder);
	const navigate = useNavigate();

	return (
		<form
			onSubmit={async (e) => {
				e.preventDefault();

				if (name.trim() === "") {
					toast.error("Du må fylle ut navnet ditt");
					return;
				}

				storeName(name);
				const order = await getShuffledOrder();
				setOrder(order);
				navigate({ to: "/quiz/$step", params: { step: "1" } });
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

			<Button type="submit">Start</Button>
		</form>
	);
};
