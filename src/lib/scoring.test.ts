import { describe, expect, it } from "vitest";
import { type MultiQuestion, type SelectQuestion, tallyScore } from "./scoring";

const selectQuestion: SelectQuestion = {
	id: "1",
	type: "select",
	prompt: "Hva heter katten min?",
	options: ["Martin", "Milo", "Morten", "Max"],
	correct: "Morten",
};

describe("tallyScore", () => {
	it("awards a point for a correct select answer", () => {
		const score = tallyScore([selectQuestion], { "1": "Morten" });
		expect(score).toBe(1);
	});

	it("awards nothing for a wrong select answer", () => {
		const score = tallyScore([selectQuestion], { "1": "Max" });
		expect(score).toBe(0);
	});

	it("awards nothing for a missing answer", () => {
		const score = tallyScore([selectQuestion], {});
		expect(score).toBe(0);
	});
});

const multiQuestion: MultiQuestion = {
	id: "1",
	type: "multi",
	prompt: "Hvilke av disse er røyk?",
	options: [
		"Prince",
		"Zyn",
		"Marabou",
		"Paramount",
		"Skruf",
		"Marlboro",
		"Camel",
	],
	correct: ["Prince", "Paramount", "Marlboro", "Camel"],
};

describe("tallyScore", () => {
	it("awards half a point for each correct answer, if not all are correct", () => {
		const score = tallyScore([multiQuestion], { "1": ["Prince", "Camel"] });

		expect(score).toBe(1);
	});

	it("deducts half a point for each wrong answer", () => {
		const score = tallyScore([multiQuestion], {
			"1": ["Prince", "Camel", "Skruf"],
		});

		expect(score).toBe(0.5);
	});

	it("awards a full point for each correct answer, if all answers are correct, but ONLY if the user has not selected more than the correct answers", () => {
		const score = tallyScore([multiQuestion], {
			"1": ["Prince", "Paramount", "Marlboro", "Camel"],
		});

		expect(score).toBe(4);
	});

	it("awards no points for no correct answers", () => {
		const score = tallyScore([multiQuestion], {
			"1": ["Zyn", "Marabou", "Skruf"],
		});

		expect(score).toBe(0);
	});
});
