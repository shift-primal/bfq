import type { Question } from "#/types/quiz.types";

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
		maxOptions: 2, // Optional: Affects how many options the user is allowed to choose. Default is no limit
	},
	{
		id: "3",
		type: "order",
		prompt:
			"Example question - order the numbers in ascending order (lowest to highest)",
		correctOrder: ["5", "14", "29", "43", "59", "72"],
	},
];
