import {
	ArrowLeftIcon,
	ArrowRightIcon,
	FastForwardIcon,
} from "@phosphor-icons/react";
import { Link } from "@tanstack/react-router";
import { Button } from "#/components/shadcn/button";
import { useNavigationHotkey } from "#/hooks/useNavigationHotkey";

export const Navigation = ({
	onBack,
	onNext,
}: {
	onBack: () => void;
	onNext: () => void;
}) => {
	useNavigationHotkey("ArrowLeft", onBack);
	useNavigationHotkey("ArrowRight", onNext);

	return (
		<div className="flex flex-col gap-y-2">
			<Button onClick={onNext} aria-label="Neste" size="lg">
				Neste
				<ArrowRightIcon />
			</Button>

			<div className="flex items-center justify-between">
				<Button
					onClick={onBack}
					variant="ghost"
					size="sm"
					className="text-muted-foreground"
					aria-label="Tilbake"
				>
					<ArrowLeftIcon />
					Tilbake
				</Button>

				<Button
					asChild
					variant="ghost"
					size="sm"
					className="text-muted-foreground"
				>
					<Link
						to="/quiz/review"
						aria-label="Gå til oppsummering"
						className="flex items-center"
					>
						Hopp til oppsummering
						<FastForwardIcon />
					</Link>
				</Button>
			</div>
		</div>
	);
};
