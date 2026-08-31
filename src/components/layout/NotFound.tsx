import { Link } from "@tanstack/react-router";
import { ErrorPage } from "#/components/layout/ErrorPage";
import { Button } from "#/components/shadcn/button";

export const NotFound = () => {
	return (
		<ErrorPage
			title="Fant ikke siden"
			description="Denne siden finnes ikke."
			actions={
				<Button asChild>
					<Link to="/">Tilbake til forsiden</Link>
				</Button>
			}
		/>
	);
};
