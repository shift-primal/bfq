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
		<div className="flex flex-col gap-y-4">
			<div className="flex gap-x-4">
				<Button onClick={onBack} aria-label="Tilbake" className="grow">
					<ArrowLeftIcon />
				</Button>
				<Button onClick={onNext} aria-label="Neste" className="grow">
					<ArrowRightIcon />
				</Button>
			</div>

			<Button asChild>
				<Link to="/quiz/review">
					<FastForwardIcon />
				</Link>
			</Button>
		</div>
	);
};
