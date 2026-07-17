import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type Answer = string | string[];

type QuizState = {
	name: string;
	answers: Record<string, Answer>;
	setName: (name: string) => void;
	setAnswer: (questionId: string, answer: Answer) => void;
	reset: () => void;
};

export const useQuizStore = create<QuizState>()(
	persist(
		(set) => ({
			name: "",
			answers: {},
			setName: (name) => set({ name }),
			setAnswer: (questionId, answer) =>
				set((state) => ({
					answers: { ...state.answers, [questionId]: answer },
				})),
			reset: () => set({ name: "", answers: {} }),
		}),
		{
			name: "quiz-progress",
			storage: createJSONStorage(() => sessionStorage),
		},
	),
);
