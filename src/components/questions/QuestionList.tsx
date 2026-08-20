export const QuestionList = ({ children }: { children: React.ReactNode }) => {
	return (
		<div className="flex flex-col gap-y-4 overflow-scroll">{children}</div>
	);
};
