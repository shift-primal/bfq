import {
	ArrowLeftIcon,
	ArrowRightIcon,
	FastForwardIcon,
} from "@phosphor-icons/react";
import { Link } from "@tanstack/react-router";
import { Button } from "#/components/shadcn/button";
import { useAppSound } from "#/hooks/useAppSound";
import { useNavigationHotkey } from "#/hooks/useNavigationHotkey";

export const Navigation = ({
	onBack,
	onNext,
	currentStep,
}: {
	onBack: () => void;
	onNext: () => void;
	currentStep: number | "review";
}) => {
	useNavigationHotkey("ArrowLeft", onBack);
	useNavigationHotkey("ArrowRight", onNext);

	const { playNext } = useAppSound();

	const canJumpToReview = typeof currentStep === "number" && currentStep >= 1;

	return (
		<div className="flex flex-col gap-y-4 py-4">
			<Button onClick={onNext} aria-label="Neste" size="lg">
				Neste
				<ArrowRightIcon aria-hidden="true" />
			</Button>

			<div className="flex items-center justify-between">
				<Button
					onClick={onBack}
					variant="ghost"
					size="sm"
					className="text-muted-foreground"
					aria-label="Tilbake"
				>
					<ArrowLeftIcon aria-hidden="true" />
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
						aria-disabled={!canJumpToReview}
						onClick={(e) => {
							!canJumpToReview && e.preventDefault();
							playNext();
						}}
						className="flex items-center aria-disabled:pointer-events-none aria-disabled:opacity-50"
					>
						Hopp til oppsummering
						<FastForwardIcon aria-hidden="true" />
					</Link>
				</Button>
			</div>
		</div>
	);
};
