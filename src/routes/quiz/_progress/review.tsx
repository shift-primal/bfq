import { createFileRoute } from "@tanstack/react-router";
import { ConfirmDialog } from "#/components/ConfirmDialog";
import { Navigation } from "#/components/Navigation";
import { ReviewRenderer } from "#/components/review/ReviewRenderer";
import { ScrollableContent } from "#/components/ScrollableContent";
import { useReviewNavigation } from "#/hooks/useReviewNavigation";

const QuizReview = () => {
	const {
		handleBack,
		handleNext,
		confirmSubmitOpen,
		setConfirmSubmitOpen,
		confirmSubmit,
	} = useReviewNavigation();

	return (
		<>
			<ScrollableContent>
				<ReviewRenderer />
			</ScrollableContent>
			<Navigation onBack={handleBack} onNext={handleNext} />

			<ConfirmDialog
				open={confirmSubmitOpen}
				onOpenChange={setConfirmSubmitOpen}
				title="Er du sikker?"
				description="Du kan ikke endre svarene dine etter at du har sendt inn"
				confirmLabel="Send inn"
				onConfirm={confirmSubmit}
			/>
		</>
	);
};

export const Route = createFileRoute("/quiz/_progress/review")({
	component: QuizReview,
});
