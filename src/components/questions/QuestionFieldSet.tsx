import type { ReactNode } from "react";
import { ScrollableContent } from "#/components/layout/ScrollableContent";
import { QuestionPromptHeader } from "#/components/questions/QuestionPromptHeader";
import { FieldDescription, FieldSet } from "#/components/shadcn/field";
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
			<QuestionPromptHeader prompt={prompt} questionType={questionType} />
			{maxOptions && (
				<FieldDescription>
					<span className="text-xs text-warning">(Kun {maxOptions} valg)</span>
				</FieldDescription>
			)}
		</div>
		<ScrollableContent>{children}</ScrollableContent>
	</FieldSet>
);
