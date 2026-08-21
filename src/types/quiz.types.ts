type BaseQuestion = { id: string; prompt: string };

export type SelectPublic = BaseQuestion & { type: "select"; options: string[] };
export type MultiPublic = BaseQuestion & { type: "multi"; options: string[] };
export type OrderPublic = BaseQuestion & {
	type: "order";
};

export type PublicQuestion = SelectPublic | MultiPublic | OrderPublic;

export type Question =
	| (SelectPublic & { correct: string })
	| (MultiPublic & { correct: string[] })
	| (OrderPublic & { correctOrder: string[] });

export type Answer = string | string[];
export type SubmittedAnswer = Record<string, Answer>;

export type ShuffledQuestion = {
	type: PublicQuestion["type"];
	prompt: string;
	options: string[];
};
