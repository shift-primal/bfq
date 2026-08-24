import { MoonIcon, SunIcon } from "@phosphor-icons/react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Button } from "#/components/shadcn/button";

export const ThemeToggle = () => {
	const { resolvedTheme, setTheme } = useTheme();
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	const isDark = mounted && resolvedTheme === "dark";

	return (
		<Button
			variant="outline"
			size="icon"
			aria-label={isDark ? "Bytt til lyst tema" : "Bytt til mørkt tema"}
			disabled={!mounted}
			onClick={() => setTheme(isDark ? "light" : "dark")}
		>
			{isDark ? <SunIcon /> : <MoonIcon />}
		</Button>
	);
};
