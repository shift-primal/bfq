import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type Answer = string | string[];

type QuizState = {
	name: string;
	answers: Record<string, Answer>;
	order: Record<string, string[]>;
	setName: (name: string) => void;
	setAnswer: (questionId: string, answer: Answer) => void;
	setOrder: (order: Record<string, string[]>) => void;
	reset: () => void;
};

export const useQuizStore = create<QuizState>()(
	persist(
		(set) => ({
			name: "",
			answers: {},
			order: {},
			setName: (name) => set({ name }),
			setAnswer: (questionId, answer) =>
				set((state) => ({
					answers: { ...state.answers, [questionId]: answer },
				})),
			setOrder: (order) => set({ order }),
			reset: () => set({ name: "", answers: {}, order: {} }),
		}),
		{
			name: "quiz-progress",
			storage: createJSONStorage(() => sessionStorage),
		},
	),
);
