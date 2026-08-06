import { Button } from "#/components/ui/button";
import { Field, FieldDescription, FieldLabel } from "#/components/ui/field";
import { Input } from "#/components/ui/input";
import { getShuffledOrder } from "#/server/questions.rpc";
import { useQuizStore } from "#/store";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/quiz/start")({
	component: RouteComponent,
});

function RouteComponent() {
	const setOrder = useQuizStore((s) => s.setOrder);

	const [name, setName] = useState("");

	const storeName = useQuizStore((s) => s.setName);

	const navigate = useNavigate();

	return (
		<form
			onSubmit={async (e) => {
				e.preventDefault();
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
					onChange={(e) => setName(e.target.value)}
				/>
				<FieldDescription>
					Navnet ditt vil bli offentlig vist sammen med din score
				</FieldDescription>
			</Field>

			<Button type="submit">Start</Button>
		</form>
	);
}
