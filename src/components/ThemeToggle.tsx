import { MoonIcon, SunIcon } from "@phosphor-icons/react";
import { useTheme } from "next-themes";
import { Button } from "#/components/shadcn/button";

export const ThemeToggle = () => {
	const { setTheme, resolvedTheme } = useTheme();

	return (
		<Button
			variant="outline"
			size="icon"
			aria-label="Bytt tema"
			onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
		>
			<SunIcon className="hidden dark:block" />
			<MoonIcon className="dark:hidden" />
		</Button>
	);
};
