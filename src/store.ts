import type { PublicQuestion } from "#/config/questions.config";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type ShuffledQuestion = {
	type: PublicQuestion["type"];
	prompt: string;
	order: string[];
};

export type Answer = string | string[];

type QuizState = {
	name: string;
	answers: Record<string, Answer>;
	questions: Record<string, ShuffledQuestion>;
	setName: (name: string) => void;
	setAnswer: (questionId: string, answer: Answer) => void;
	setQuestions: (questions: Record<string, ShuffledQuestion>) => void;
	reset: () => void;
};

export const useQuizStore = create<QuizState>()(
	persist(
		(set) => ({
			name: "",
			answers: {},
			questions: {},
			setName: (name) => set({ name }),
			setAnswer: (questionId, answer) =>
				set((state) => ({
					answers: { ...state.answers, [questionId]: answer },
				})),
			setQuestions: (questions) => set({ questions }),
			reset: () => set({ name: "", answers: {}, questions: {} }),
		}),
		{
			name: "quiz-progress",
			storage: createJSONStorage(() => sessionStorage),
		},
	),
);
