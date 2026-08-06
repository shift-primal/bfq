import { Button } from "#/components/ui/button";
import type { PublicQuestion } from "#/config/questions.config";
import { isAnswered } from "#/lib/questions.utils";
import { useQuizStore } from "#/store";
import { useNavigate } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, RefreshCcw } from "lucide-react";
import { useEffect } from "react";

export const Navigation = ({
	step,
	total,
	question,
}: {
	step: number;
	total: number;
	question: PublicQuestion;
}) => {
	const answer = useQuizStore((s) => s.answers[question.id]);
	const navigate = useNavigate();

	const goBack = () => {
		if (step === 1) navigate({ to: "/quiz/start" });
		else navigate({ to: "/quiz/$step", params: { step: String(step - 1) } });
	};

	const goNext = () => {
		if (step >= total) navigate({ to: "/quiz/review" });
		else navigate({ to: "/quiz/$step", params: { step: String(step + 1) } });
	};

	const reset = useQuizStore((s) => s.reset);

	useEffect(() => {
		console.log(answer);
	}, [answer]);

	return (
		<div className="flex justify-between">
			<Button onClick={goBack}>
				<ArrowLeft />
			</Button>
			<Button
				variant="outline"
				className="bg-red-400 text-white"
				onClick={() => {
					reset();
					navigate({ to: "/quiz/start" });
				}}
			>
				<RefreshCcw />
			</Button>
			<Button onClick={goNext} disabled={!isAnswered(question.type, answer)}>
				<ArrowRight />
			</Button>
		</div>
	);
};
