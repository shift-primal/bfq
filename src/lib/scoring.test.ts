import { describe, expect, it } from "vitest";
import {
	type ScoredMultiQuestion,
	type ScoredOrderQuestion,
	type ScoredSelectQuestion,
	tallyScore,
} from "./scoring";

const selectQuestion: ScoredSelectQuestion = {
	id: "1",
	type: "select",
	prompt: "Hva heter katten min?",
	options: ["Martin", "Milo", "Morten", "Max"],
	correct: "Morten",
};

describe("Tally (Select)", () => {
	it("awards a point for a correct select answer", () => {
		const score = tallyScore([selectQuestion], { "1": "Morten" });
		expect(score).toBe(1);
	});

	it("awards nothing for a wrong select answer", () => {
		const score = tallyScore([selectQuestion], { "1": "Max" });
		expect(score).toBe(0);
	});
});

const multiQuestion: ScoredMultiQuestion = {
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

describe("Tally (Multi)", () => {
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

const orderQuestion: ScoredOrderQuestion = {
	id: "1",
	type: "order",
	prompt: "Sorter disse i stigende rekkefølge",
	correctOrder: ["5", "9", "20", "45", "89", "192"],
};

describe("Tally (Order)", () => {
	it("awards partial credit proportional to correctly-ordered pairs", () => {
		const score = tallyScore([orderQuestion], {
			"1": ["9", "5", "20", "45", "192", "89"],
		});

		expect(score).toBeCloseTo(5.2);
	});

	it("awards less credit the more pairs are out of order", () => {
		const score = tallyScore([orderQuestion], {
			"1": ["192", "89", "9", "5", "20", "45"],
		});

		expect(score).toBeCloseTo(2);
	});

	it("awards full credit for a perfectly ordered answer", () => {
		const score = tallyScore([orderQuestion], {
			"1": ["5", "9", "20", "45", "89", "192"],
		});

		expect(score).toBe(6);
	});

	it("awards no credit when every pair is in the wrong order", () => {
		const score = tallyScore([orderQuestion], {
			"1": ["192", "89", "45", "20", "9", "5"],
		});

		expect(score).toBe(0);
	});
});
