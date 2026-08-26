import type { ReactNode } from "react";
import { ScrollableContent } from "#/components/ScrollableContent";
import { FieldLegend, FieldSet, FieldTitle } from "#/components/shadcn/field";
import { typeToDisplay } from "#/lib/format";
import type { PublicQuestion } from "#/types/quiz.types.ts";

export const QuestionFieldSet = ({
	prompt,
	questionType,
	children,
}: {
	prompt: string;
	questionType: PublicQuestion["type"];
	children: ReactNode;
}) => (
	<FieldSet className="flex-1 overflow-hidden">
		<div className="px-3">
			<FieldLegend>{prompt}</FieldLegend>
			<FieldTitle className="font-normal text-muted-foreground">
				{typeToDisplay(questionType)}
			</FieldTitle>
		</div>
		<ScrollableContent>{children}</ScrollableContent>
	</FieldSet>
);
