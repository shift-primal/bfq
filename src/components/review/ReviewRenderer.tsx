import { useShallow } from "zustand/react/shallow";
import {
	type ReviewItem,
	ReviewItemCard,
} from "#/components/review/ReviewItemCard";
import { isOrderUntouched } from "#/lib/questions.utils";
import { useQuizStore } from "#/stores/quiz-store";

export const ReviewRenderer = () => {
	const { questions, answers } = useQuizStore(
		useShallow((s) => ({
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
			case "order": {
				const orderAnswer = answer as string[] | undefined;
				return {
					id,
					type: q.type,
					prompt: q.prompt,
					answer: orderAnswer,
					potentiallyUnanswered: isOrderUntouched(q.options, orderAnswer),
				};
			}
			default:
				return q.type satisfies never;
		}
	});

	return (
		<div className="flex flex-col gap-y-4">
			{reviewItems.map((i) => (
				<ReviewItemCard key={i.id} item={i} />
			))}
		</div>
	);
};
