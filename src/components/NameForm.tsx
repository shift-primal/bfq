import { useShallow } from "zustand/react/shallow";
import { ConfirmDialog } from "#/components/ConfirmDialog";
import { Navigation } from "#/components/Navigation";
import { ScrollableContent } from "#/components/ScrollableContent";
import { Field, FieldDescription, FieldLabel } from "#/components/shadcn/field";
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
	const {
		handleBack,
		handleNext,
		confirmBackOpen,
		setConfirmBackOpen,
		confirmBack,
	} = useNameFormNavigation();

	return (
		<>
			<ScrollableContent>
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
			</ScrollableContent>

			<Navigation onBack={handleBack} onNext={handleNext} />

			<ConfirmDialog
				open={confirmBackOpen}
				onOpenChange={setConfirmBackOpen}
				title="Er du sikker?"
				description="Hvis du går tilbake mister du det du har fylt ut"
				confirmLabel="Fortsett"
				destructive
				onConfirm={confirmBack}
			/>
		</>
	);
};
