import { FieldLegend, FieldTitle } from "#/components/shadcn/field";
import { typeToDisplay } from "#/lib/format";
import type { PublicQuestion } from "#/types/quiz.types";

export const QuestionPromptHeader = ({
	prompt,
	questionType,
	legendVariant,
}: {
	prompt: string;
	questionType: PublicQuestion["type"];
	legendVariant?: "legend" | "label";
}) => (
	<>
		<FieldLegend variant={legendVariant}>{prompt}</FieldLegend>
		<FieldTitle className="font-normal text-muted-foreground">
			{typeToDisplay(questionType)}
		</FieldTitle>
	</>
);
