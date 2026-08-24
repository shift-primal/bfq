import { useLocation, useParams } from "@tanstack/react-router";

export const useQuizStep = (questionCount: number) => {
	const { pathname } = useLocation();
	const { step: stepParam } = useParams({ strict: false });

	const total = questionCount + 1;
	const step =
		pathname === "/quiz/review"
			? total
			: stepParam !== undefined
				? Number(stepParam)
				: 0;

	return { step, total };
};
