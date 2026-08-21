import type { ReactNode } from "react";
import { FieldLegend, FieldSet } from "#/components/shadcn/field";

export const QuestionFieldSet = ({
	prompt,
	children,
}: {
	prompt: string;
	children: ReactNode;
}) => (
	<FieldSet>
		<FieldLegend>{prompt}</FieldLegend>
		{children}
	</FieldSet>
);
