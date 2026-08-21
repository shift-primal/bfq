import { useShallow } from "zustand/react/shallow";
import { MultiQuestion } from "#/components/questions/Question.Multi";
import { OrderQuestion } from "#/components/questions/Question.Order";
import { SelectQuestion } from "#/components/questions/Question.Select";
import type { PublicQuestion } from "#/config/questions.config";
import { useQuizStore } from "#/stores/quiz-store";

const renderReviewQuestion = (q: PublicQuestion) => {
	switch (q.type) {
		case "select":
			return <SelectQuestion key={q.id} question={q} disabled />;
		case "multi":
			return <MultiQuestion key={q.id} question={q} disabled />;
		case "order":
			return <OrderQuestion key={q.id} question={q} disabled />;
	}
};

export const ReviewRenderer = () => {
	const { name, questions } = useQuizStore(
		useShallow((s) => ({
			name: s.name,
			questions: s.questions,
		})),
	);

	const fullQuestions: PublicQuestion[] = Object.entries(questions).map(
		([id, q]) =>
			({
				id,
				prompt: q.prompt,
				type: q.type,
				options: q.options,
			}) as PublicQuestion,
	);
	return (
		<>
			<p>hei {name}</p>
			<div className="flex flex-col">
				{fullQuestions.map(renderReviewQuestion)}
			</div>
		</>
	);
};
