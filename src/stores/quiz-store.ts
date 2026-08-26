import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import type { Answer, ShuffledQuestion } from "#/types/quiz.types";

type QuizState = {
	name: string;
	answers: Record<string, Answer>;
	questions: Record<string, ShuffledQuestion>;
	currentStep: number;
	setName: (name: string) => void;
	setAnswer: (questionId: string, answer: Answer) => void;
	setQuestions: (questions: Record<string, ShuffledQuestion>) => void;
	setStep: (step: number) => void;
	reset: () => void;
};

export const useQuizStore = create<QuizState>()(
	persist(
		(set) => ({
			name: "",
			answers: {},
			questions: {},
			currentStep: 1,
			setName: (name) => set({ name }),
			setAnswer: (questionId, answer) =>
				set((state) => ({
					answers: { ...state.answers, [questionId]: answer },
				})),
			setQuestions: (questions) =>
				set((state) => {
					const seededAnswers = Object.fromEntries(
						Object.entries(questions)
							.filter(([_, q]) => q.type === "order")
							.map(([id, q]) => [id, q.options]),
					);

					return { questions, answers: { ...state.answers, ...seededAnswers } };
				}),
			setStep: (step) => set({ currentStep: step }),
			reset: () =>
				set({ name: "", answers: {}, questions: {}, currentStep: 1 }),
		}),
		{
			name: "quiz-progress",
			storage: createJSONStorage(() => sessionStorage),
		},
	),
);
