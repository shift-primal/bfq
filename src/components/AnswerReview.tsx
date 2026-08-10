import { useQuizStore } from "#/store";
import { useShallow } from "zustand/react/shallow";

export const AnswerReview = () => {
	const { name, questions, answers } = useQuizStore(
		useShallow((s) => ({
			name: s.name,
			questions: s.questions,
			answers: s.answers,
		})),
	);

	const fullQuestions = Object.entries(questions).map(([id, q]) => ({
		id,
		prompt: q.prompt,
		answer: answers[id],
	}));

	// console.log("Questions: ", questions);
	// console.log("Answers: ", answers);

	return (
		<>
			<p>hei {name}</p>
			{fullQuestions.map((q) => (
				<div key={q.id}>
					<p>{q.prompt}</p>
					<p>{q.answer}</p>
				</div>
			))}
		</>
	);
};
