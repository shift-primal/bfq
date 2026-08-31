export const PageContainer = ({ children }: { children: React.ReactNode }) => {
	return (
		<main className="mx-auto w-full max-w-2xl px-4 pt-[var(--header-h)] sm:px-6 lg:px-8">
			{children}
		</main>
	);
};
