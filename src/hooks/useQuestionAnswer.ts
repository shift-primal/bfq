import { useShallow } from "zustand/react/shallow";
import { useQuizStore } from "#/stores/quiz-store";

export function useQuestionAnswer(
	questionId: string,
	fallbackOptions: string[],
) {
	return useQuizStore(
		useShallow((s) => ({
			answer: s.answers[questionId],
			setAnswer: s.setAnswer,
			options: s.questions[questionId]?.options ?? fallbackOptions,
		})),
	);
}
