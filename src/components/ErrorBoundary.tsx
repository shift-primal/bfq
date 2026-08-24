import { type ErrorComponentProps, Link } from "@tanstack/react-router";
import { ErrorPage } from "#/components/ErrorPage";
import { Button } from "#/components/shadcn/button";

export const ErrorBoundary = ({ error, reset }: ErrorComponentProps) => {
	return (
		<ErrorPage
			title="Noe gikk galt"
			description={error.message}
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
