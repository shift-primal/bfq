import { useShallow } from "zustand/react/shallow";
import { Navigation } from "#/components/Navigation";
import { ScrollableContent } from "#/components/ScrollableContent";
import {
	Field,
	FieldDescription,
	FieldLabel,
	FieldLegend,
	FieldSet,
} from "#/components/shadcn/field";
import { Input } from "#/components/shadcn/input";
import { useNameFormNavigation } from "#/hooks/useNameFormNavigation";
import { useQuizStore } from "#/stores/quiz-store";

export const NameForm = () => {
	const { name, setName } = useQuizStore(
		useShallow((s) => ({
			name: s.name,
			setName: s.setName,
		})),
	);
	const { handleBack, handleNext } = useNameFormNavigation();

	return (
		<>
			<FieldSet className="flex-1 overflow-hidden">
				<div className="px-3">
					<FieldLegend>Hva heter du?</FieldLegend>
				</div>
				<ScrollableContent>
					<form
						className="flex flex-col gap-y-6 px-3 py-1.5"
						onSubmit={(e) => {
							e.preventDefault();
							handleNext();
						}}
					>
						<Field>
							<FieldLabel
								htmlFor="input-name"
								className="sr-only text-transparent"
							>
								Navn
							</FieldLabel>
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
				</ScrollableContent>
			</FieldSet>

			<Navigation onBack={handleBack} onNext={handleNext} />
		</>
	);
};
