import { ArrowLeft, ArrowRight } from "lucide-react";

import { Button } from "#/components/shadcn/button";
import { useNavigationHotkey } from "#/hooks/useNavigationHotkey";
import { Link } from "@tanstack/react-router";
import { FastForwardIcon } from "@phosphor-icons/react";

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
					<ArrowLeft />
				</Button>
				<Button onClick={onNext} aria-label="Neste" className="grow">
					<ArrowRight />
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
