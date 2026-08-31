import type { ReactNode } from "react";
import { FieldLegend, FieldSet, FieldTitle } from "#/components/shadcn/field";
import { typeToDisplay } from "#/lib/format";
import type { PublicQuestion } from "#/types/quiz.types";

export const QuestionSummaryFieldSet = ({
	prompt,
	questionType,
	indicator,
	children,
}: {
	prompt: string;
	questionType: PublicQuestion["type"];
	indicator?: ReactNode;
	children: ReactNode;
}) => (
	<FieldSet className="rounded-2xl border border-border/60 bg-card/30 p-6 select-none">
		<div className="flex items-start justify-between gap-2">
			<div>
				<FieldLegend variant="label">{prompt}</FieldLegend>
				<FieldTitle className="font-normal text-muted-foreground">
					{typeToDisplay(questionType)}
				</FieldTitle>
			</div>
			{indicator}
		</div>
		{children}
	</FieldSet>
);
