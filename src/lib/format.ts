import type { Answer, PublicQuestion } from "#/types/quiz.types";

const TYPE_LABELS: Record<PublicQuestion["type"], string> = {
	select: "Envalg",
	multi: "Flervalg",
	order: "Rekkefølge",
};

export const typeToDisplay = (type: PublicQuestion["type"]) =>
	TYPE_LABELS[type];

export const formatAnswer = (answer: Answer | undefined) => {
	if (!answer || answer.length <= 0) return "Mangler svar!";

	if (Array.isArray(answer)) return answer.join(", ");

	return answer;
};
