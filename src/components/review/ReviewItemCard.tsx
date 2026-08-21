import { WarningCircleIcon } from "@phosphor-icons/react";
import { Link } from "@tanstack/react-router";
import {
	Card,
	CardAction,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "#/components/shadcn/card";
import type { PublicQuestion } from "#/config/questions.config";
import { formatAnswer, typeToDisplay } from "#/lib/format";
import { isAnswered } from "#/lib/questions.utils";
import { cn } from "#/lib/utils";
import type { Answer } from "#/stores/quiz-store";

export type ReviewItem = PublicQuestion & { answer: Answer | undefined };

export const ReviewItemCard = ({ item }: { item: ReviewItem }) => {
	const answered = isAnswered(item.type, item.answer);

	const formattedAnswer = formatAnswer(item.answer);

	return (
		<Link to="/quiz/$step" params={{ step: item.id }}>
			<Card>
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
				</CardHeader>
				<CardContent>
					<p className={cn("font-medium", !answered && "text-destructive")}>
						{formattedAnswer}
					</p>
				</CardContent>
			</Card>
		</Link>
	);
};
