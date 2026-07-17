type BaseQuestion = { id: string; prompt: string };

type SelectPublic = BaseQuestion & { type: "select"; options: string[] };
type MultiPublic = BaseQuestion & { type: "multi"; options: string[] };
type OrderPublic = BaseQuestion & { type: "order"; items: string[] };

export type PublicQuestion = SelectPublic | MultiPublic | OrderPublic;

export type Question =
	| (SelectPublic & { correct: string })
	| (MultiPublic & { correct: string[] })
	| (OrderPublic & { correctOrder: string[] });

export const questions: Question[] = [
	{
		id: "1",
		type: "select",
		prompt: "Hva liker jeg best",
		options: ["Røyk", "Salami", "Reker"],
		correct: "Røyk",
	},
	{
		id: "2",
		type: "multi",
		prompt: "Hvilke spill har jeg IKKE fullført",
		options: [
			"Factorio",
			"Satisfactory",
			"Hollow Knight",
			"Badlands 2",
			"The Witcher 3",
			"The Binding of Isaac",
		],
		correct: ["Badlands 2", "The Witcher 3", "The Binding of Isaac"],
	},
	{
		id: "3",
		type: "order",
		prompt: "Ranger artistene etter hvor godt jeg liker de",
		items: ["AC/DC", "Nirvana", "Logic", "Dua Lipa"],
		correctOrder: ["Logic", "Nirvana", "Dua Lipa", "AC/DC"],
	},
];
