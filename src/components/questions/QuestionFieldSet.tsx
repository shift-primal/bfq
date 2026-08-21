import type { ReactNode } from "react";
import { FieldLegend, FieldSet, FieldTitle } from "#/components/shadcn/field";
import type { PublicQuestion } from "#/types/quiz.types.ts";
import { typeToDisplay } from "#/lib/format";

export const QuestionFieldSet = ({
	prompt,
	questionType,
	children,
}: {
	prompt: string;
	questionType: PublicQuestion["type"];
	children: ReactNode;
}) => (
	<FieldSet>
		<FieldLegend>{prompt}</FieldLegend>
		<FieldTitle>{typeToDisplay(questionType)}</FieldTitle>
		{children}
	</FieldSet>
);
