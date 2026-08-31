import type { PublicQuestion } from "#/types/quiz.types";

const TYPE_LABELS: Record<PublicQuestion["type"], string> = {
	select: "Envalg",
	multi: "Flervalg",
	order: "Rekkefølge",
};

export const typeToDisplay = (type: PublicQuestion["type"]) =>
	TYPE_LABELS[type];
