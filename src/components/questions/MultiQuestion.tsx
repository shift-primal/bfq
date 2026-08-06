import type { MultiPublic } from "#/config/questions.config";

export const MultiQuestion = ({ question }: { question: MultiPublic }) => {
	return (
		<div className="flex flex-col">
			<span>Multi Question</span>
			<span>{question.prompt}</span>
		</div>
	);
};
