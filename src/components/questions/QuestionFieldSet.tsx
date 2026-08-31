import type { ReactNode } from "react";
import { ScrollableContent } from "#/components/ScrollableContent";
import {
	FieldDescription,
	FieldLegend,
	FieldSet,
	FieldTitle,
} from "#/components/shadcn/field";
import { typeToDisplay } from "#/lib/format";
import type { PublicQuestion } from "#/types/quiz.types.ts";

export const QuestionFieldSet = ({
	prompt,
	questionType,
	maxOptions,
	children,
}: {
	prompt: string;
	questionType: PublicQuestion["type"];
	maxOptions?: number;
	children: ReactNode;
}) => (
	<FieldSet className="flex-1 overflow-y-hidden">
		<div className="px-3">
			<FieldLegend>{prompt}</FieldLegend>
			<FieldTitle className="font-normal text-muted-foreground">
				<span>{typeToDisplay(questionType)}</span>
			</FieldTitle>
			{maxOptions && (
				<FieldDescription>
					<span className="text-xs text-warning">(Kun {maxOptions} valg)</span>
				</FieldDescription>
			)}
		</div>
		<ScrollableContent>{children}</ScrollableContent>
	</FieldSet>
);
