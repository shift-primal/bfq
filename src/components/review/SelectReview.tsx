import type { ReviewQuestion } from "#/components/ReviewRenderer";

export const SelectReview = ({ question }: { question: ReviewQuestion }) => {
	return (
		<>
			<span>{question.prompt}</span>
			{question.options.map((o) => {
				const selected = question.answer === o;

				return <p style={selected ? { backgroundColor: "blue" } : {}}>{o}</p>;
			})}
		</>
	);
};
