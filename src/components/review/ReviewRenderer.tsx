import { useShallow } from "zustand/react/shallow";
import {
	type ReviewItem,
	ReviewItemCard,
} from "#/components/review/ReviewItemCard";
import { useQuizStore } from "#/stores/quiz-store";

export const ReviewRenderer = () => {
	const { name, questions, answers } = useQuizStore(
		useShallow((s) => ({
			name: s.name,
			answers: s.answers,
			questions: s.questions,
		})),
	);

	const reviewItems: ReviewItem[] = Object.entries(questions).map(([id, q]) => {
		const answer = answers[id];
		switch (q.type) {
			case "select":
				return {
					id,
					type: q.type,
					prompt: q.prompt,
					options: q.options,
					answer: answer as string | undefined,
				};
			case "multi":
				return {
					id,
					type: q.type,
					prompt: q.prompt,
					options: q.options,
					answer: answer as string[] | undefined,
				};
			case "order":
				return {
					id,
					type: q.type,
					prompt: q.prompt,
					answer: answer as string[] | undefined,
				};
			default:
				return q.type satisfies never;
		}
	});

	return (
		<>
			<p>hei {name}</p>
			<div className="flex flex-col">
				{reviewItems.map((i) => (
					<ReviewItemCard key={i.id} item={i} />
				))}
			</div>
		</>
	);
};
