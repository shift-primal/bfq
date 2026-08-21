import type { Question } from "#/config/questions.config";
import type { Answer } from "#/stores/quiz-store";

const TYPE_LABELS: Record<Question["type"], string> = {
	select: "Envalg",
	multi: "Flervalg",
	order: "Rekkefølge",
};

export const typeToDisplay = (type: Question["type"]) => TYPE_LABELS[type];

export const formatAnswer = (answer: Answer | undefined) => {
	if (!answer || answer.length <= 0) return "Mangler svar!";

	if (Array.isArray(answer)) return answer.join(", ");

	return answer;
};
