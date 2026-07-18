import { Field, FieldDescription, FieldLabel } from "#/components/ui/field";
import { Input } from "#/components/ui/input";
import { useQuizStore } from "#/store";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/quiz/start")({
	component: RouteComponent,
});

function RouteComponent() {
	const [name, setName] = useState("");

	const storeName = useQuizStore((s) => s.setName);

	const navigate = useNavigate();

	return (
		<div>
			<form
				onSubmit={(e) => {
					e.preventDefault();
					storeName(name);
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
			</form>
		</div>
	);
}
