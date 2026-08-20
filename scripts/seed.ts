import { questions } from "#/config/questions.data";
import { shuffleArray } from "#/lib/utils";
import { insertSubmission } from "#/server/submission.rpc";
import type { Answer } from "#/stores/quiz-store";

const NAMES = [
	"Alice",
	"Bob",
	"Carol",
	"Dave",
	"Eve",
	"Frank",
	"Grace",
	"Heidi",
	"Ivan",
	"Judy",
];

function randomAnswer(question: (typeof questions)[number]): Answer {
	switch (question.type) {
		case "select":
			return question.options[
				Math.floor(Math.random() * question.options.length)
			];
		case "multi": {
			const count = Math.floor(Math.random() * question.options.length) + 1;
			return shuffleArray(question.options).slice(0, count);
		}
		case "order":
			return shuffleArray(question.correctOrder);
	}
}

for (const name of NAMES) {
	const answers = Object.fromEntries(
		questions.map((q) => [q.id, randomAnswer(q)]),
	);

	const id = await insertSubmission({ name, answers });
	console.log(`Submitted ${name} -> ${id}`);
}
