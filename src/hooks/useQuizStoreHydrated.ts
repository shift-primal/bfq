import { useEffect, useState } from "react";
import { useQuizStore } from "#/stores/quiz-store";

/**
 * True once it's safe to trust client-only reads from `useQuizStore` (e.g.
 * `name`). Always starts `false` and only ever flips inside an effect, since
 * `useSyncExternalStore` holds the SSR-matching snapshot on React's first
 * hydration render even after the store's real value has updated.
 */
export const useQuizStoreHydrated = () => {
	const [hydrated, setHydrated] = useState(false);

	useEffect(() => {
		if (useQuizStore.persist.hasHydrated()) {
			setHydrated(true);
			return;
		}
		return useQuizStore.persist.onFinishHydration(() => setHydrated(true));
	}, []);

	return hydrated;
};
