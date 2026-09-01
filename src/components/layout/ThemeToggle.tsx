import { MoonIcon, SunIcon } from "@phosphor-icons/react";
import { useTheme } from "next-themes";
import { Button } from "#/components/shadcn/button";
import { useAppSound } from "#/hooks/useAppSound";

export const ThemeToggle = () => {
	const { setTheme, resolvedTheme } = useTheme();
	const { playSelect, playDeselect } = useAppSound();

	return (
		<Button
			variant="ghost"
			size="icon"
			aria-label="Bytt tema"
			onClick={() => {
				resolvedTheme === "dark" ? playSelect() : playDeselect();
				setTheme(resolvedTheme === "dark" ? "light" : "dark");
			}}
		>
			<SunIcon aria-hidden="true" className="hidden dark:block" />
			<MoonIcon aria-hidden="true" className="dark:hidden" />
		</Button>
	);
};
