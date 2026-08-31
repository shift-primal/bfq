type BaseQuestion = { id: string; prompt: string };

export type SelectPublic = BaseQuestion & { type: "select"; options: string[] };
export type MultiPublic = BaseQuestion & {
	type: "multi";
	options: string[];
	maxOptions?: number;
};
export type OrderPublic = BaseQuestion & { type: "order" };

export type PublicQuestion = SelectPublic | MultiPublic | OrderPublic;

export type Question =
	| (SelectPublic & { correct: string })
	| (MultiPublic & { correct: string[]; maxOptions?: number })
	| (OrderPublic & { correctOrder: string[] });

export type Answer = string | string[];
export type SubmittedAnswer = Record<string, Answer>;

export type ShuffledQuestion = {
	type: PublicQuestion["type"];
	prompt: string;
	options: string[];
	maxOptions?: number;
};

export type ResultSelect = SelectPublic & { correct: string; answer: string };
export type ResultMulti = MultiPublic & {
	correct: string[];
	answer: string[];
};
export type ResultOrder = OrderPublic & {
	correctOrder: string[];
	answer: string[];
};

export type ResultQuestion = ResultSelect | ResultMulti | ResultOrder;

export type SubmissionResult = {
	name: string;
	score: number;
	questions: ResultQuestion[];
};
