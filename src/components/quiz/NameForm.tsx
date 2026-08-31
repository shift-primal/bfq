import { UserIcon } from "@phosphor-icons/react";
import { useShallow } from "zustand/react/shallow";
import { ScrollableContent } from "#/components/layout/ScrollableContent";
import { Navigation } from "#/components/quiz/Navigation";
import {
	Field,
	FieldLabel,
	FieldLegend,
	FieldSet,
	FieldTitle,
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
			<FieldSet className="flex-1 overflow-y-hidden">
				<div className="px-3">
					<FieldLegend>Hva heter du?</FieldLegend>
					<FieldTitle className="font-normal text-muted-foreground">
						Vises på ledertavlen sammen med scoren din
					</FieldTitle>
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
							<div className="flex items-center gap-4 rounded-2xl border border-input bg-background px-3 py-2.5 shadow-xs transition-all duration-200 focus-within:border-ring focus-within:ring-1 focus-within:ring-ring/30">
								<span
									aria-hidden="true"
									className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary"
								>
									<UserIcon weight="bold" className="size-4" />
								</span>
								<Input
									id="input-name"
									type="text"
									placeholder="Kasper..."
									autoFocus
									value={name}
									onChange={(e) => setName(e.target.value)}
									className="h-auto border-0 bg-transparent p-0 shadow-none focus-visible:ring-0 px-2"
								/>
							</div>
						</Field>
					</form>
				</ScrollableContent>
			</FieldSet>

			<Navigation onBack={handleBack} onNext={handleNext} />
		</>
	);
};
