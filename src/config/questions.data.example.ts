import type { Question } from "./questions.config";

export const questions: Question[] = [
	{
		id: "1",
		type: "select",
		prompt: "Example question — pick one",
		options: ["A", "B", "C"],
		correct: "A",
	},
];
