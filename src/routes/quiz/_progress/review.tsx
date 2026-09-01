import { createFileRoute } from "@tanstack/react-router";
import { ScrollableContent } from "#/components/layout/ScrollableContent";
import { ConfirmDialog } from "#/components/quiz/ConfirmDialog";
import { Navigation } from "#/components/quiz/Navigation";
import { ReviewRenderer } from "#/components/summary/ReviewRenderer";
import { useReviewNavigation } from "#/hooks/useReviewNavigation";
import { requireName } from "#/lib/require-name.guard";

const QuizReview = () => {
	const {
		handleBack,
		handleNext,
		confirmSubmitOpen,
		setConfirmSubmitOpen,
		confirmSubmit,
		isSubmitting,
	} = useReviewNavigation();

	return (
		<>
			<ScrollableContent>
				<ReviewRenderer />
			</ScrollableContent>
			<Navigation
				onBack={handleBack}
				onNext={handleNext}
				currentStep="review"
			/>

			<ConfirmDialog
				open={confirmSubmitOpen}
				onOpenChange={setConfirmSubmitOpen}
				title="Er du sikker?"
				description="Du kan ikke endre svarene dine etter at du har sendt inn"
				confirmLabel="Send inn"
				onConfirm={confirmSubmit}
				pending={isSubmitting}
			/>
		</>
	);
};

export const Route = createFileRoute("/quiz/_progress/review")({
	beforeLoad: requireName,
	component: QuizReview,
});
