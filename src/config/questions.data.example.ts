import type { Question } from "./questions.config";

export const questions: Question[] = [
	{
		id: "1",
		type: "select",
		prompt: "Example question — pick one",
		options: ["A", "B", "C"],
		correct: "A",
	},
	{
		id: "2",
		type: "multi",
		prompt: "Example question — pick all numbers greater or equal to 8",
		options: ["8", "2", "1", "9"],
		correct: ["8", "9"],
	},
	{
		id: "2",
		type: "order",
		prompt:
			"Example question - order the numbers in ascending order (lowest to highest)",
		correctOrder: ["5", "14", "29", "43", "59", "72"],
	},
];
