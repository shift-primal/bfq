export const QuestionList = ({
	slot,
	children,
}: {
	slot: "checkbox-group" | "radio-group" | "sortable-group";
	children: React.ReactNode;
}) => {
	return (
		<div data-slot={slot} className="flex flex-col p-1.5">
			{children}
		</div>
	);
};
