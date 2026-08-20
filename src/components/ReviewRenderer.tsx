import { useShallow } from "zustand/react/shallow";
import { MultiQuestion } from "#/components/questions/MultiQuestion";
import { OrderQuestion } from "#/components/questions/OrderQuestion";
import { SelectQuestion } from "#/components/questions/SelectQuestion";
import type { PublicQuestion } from "#/config/questions.config";
import { useQuizStore } from "#/store";

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
			{fullQuestions.map(renderReviewQuestion)}
		</>
	);
};
