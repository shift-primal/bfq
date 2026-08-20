export const PageContainer = ({ children }: { children: React.ReactNode }) => {
	return (
		<div className="mx-auto w-full max-w-2xl px-4 sm:px-6 lg:px-8 flex-1 overflow-y-auto">
			{children}
		</div>
	);
};
