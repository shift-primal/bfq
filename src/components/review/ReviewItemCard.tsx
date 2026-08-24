import { WarningCircleIcon, WarningIcon } from "@phosphor-icons/react";
import { Link } from "@tanstack/react-router";
import {
	Card,
	CardAction,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "#/components/shadcn/card";
import { formatAnswer, typeToDisplay } from "#/lib/format";
import { isAnswered } from "#/lib/questions.utils";
import { cn } from "#/lib/utils";
import type { Answer, PublicQuestion } from "#/types/quiz.types";

export type ReviewItem = PublicQuestion & {
	answer: Answer | undefined;
	potentiallyUnanswered?: boolean;
};

export const ReviewItemCard = ({ item }: { item: ReviewItem }) => {
	const answered = isAnswered(item.type, item.answer);
	const potentiallyUnanswered = answered && item.potentiallyUnanswered;

	const formattedAnswer = formatAnswer(item.answer);

	return (
		<Link to="/quiz/$step" params={{ step: item.id }}>
			<Card
				className={cn(
					"rounded-2xl gap-y-3 border border-input py-4 transition-colors bg-background",
					"hover:bg-muted/50",
					"cursor-pointer",
				)}
			>
				<CardHeader>
					<CardTitle>{item.prompt}</CardTitle>
					<CardDescription>{typeToDisplay(item.type)}</CardDescription>
					{!answered && (
						<CardAction>
							<div className="flex gap-x-1">
								<WarningCircleIcon size={16} className="text-destructive" />
							</div>
						</CardAction>
					)}
					{potentiallyUnanswered && (
						<CardAction>
							<div className="flex gap-x-1">
								<WarningIcon size={16} className="text-warning" />
							</div>
						</CardAction>
					)}
				</CardHeader>
				<CardContent>
					<p
						className={cn(
							"font-medium",
							!answered && "text-destructive",
							potentiallyUnanswered && "text-warning",
						)}
					>
						{formattedAnswer}
					</p>
				</CardContent>
			</Card>
		</Link>
	);
};
