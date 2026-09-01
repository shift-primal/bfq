import { redirect } from "@tanstack/react-router";
import { useQuizStore } from "#/stores/quiz-store";

export async function requireName() {
	if (typeof window === "undefined") return;

	let unsub: (() => void) | undefined;

	const hydrated = new Promise<void>((resolve) => {
		if (useQuizStore.persist.hasHydrated()) return resolve();
		unsub = useQuizStore.persist.onFinishHydration(() => resolve());
	});

	const timeout = new Promise<void>((resolve) => setTimeout(resolve, 3000));

	await Promise.race([hydrated, timeout]);
	unsub?.();

	if (!useQuizStore.getState().name) throw redirect({ to: "/quiz/start" });
}
