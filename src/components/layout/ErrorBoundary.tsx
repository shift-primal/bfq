import { type ErrorComponentProps, Link } from "@tanstack/react-router";
import { ErrorPage } from "#/components/layout/ErrorPage";
import { Button } from "#/components/shadcn/button";

export const ErrorBoundary = ({ reset }: ErrorComponentProps) => {
	return (
		<ErrorPage
			title="Noe gikk galt"
			description="Beklager! Vennligst prøv igjen."
			actions={
				<>
					<Button variant="outline" onClick={reset}>
						Prøv igjen
					</Button>
					<Button asChild>
						<Link to="/">Tilbake til forsiden</Link>
					</Button>
				</>
			}
		/>
	);
};
