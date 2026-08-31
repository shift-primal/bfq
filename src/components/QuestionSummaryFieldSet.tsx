import type { ReactNode } from "react";
import { QuestionPromptHeader } from "#/components/questions/QuestionPromptHeader";
import { FieldSet } from "#/components/shadcn/field";
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
	<FieldSet className="rounded-2xl border border-border/60 bg-card/30 p-8">
		<div className="flex items-start justify-between gap-2">
			<div>
				<QuestionPromptHeader
					prompt={prompt}
					questionType={questionType}
					legendVariant="label"
				/>
			</div>
			{indicator}
		</div>
		{children}
	</FieldSet>
);
