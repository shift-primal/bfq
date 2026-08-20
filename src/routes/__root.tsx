import { TanStackDevtools } from "@tanstack/react-devtools";
import type { QueryClient } from "@tanstack/react-query";
import {
	createRootRouteWithContext,
	type ErrorComponentProps,
	HeadContent,
	Link,
	Scripts,
} from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import { PageContainer } from "#/components/PageContainer";
import { Button } from "#/components/shadcn/button";
import { Toaster } from "#/components/shadcn/sonner";
import TanStackQueryDevtools from "../integrations/tanstack-query/devtools";
import appCss from "../styles.css?url";

interface MyRouterContext {
	queryClient: QueryClient;
}

function NotFound() {
	return (
		<div className="flex flex-col items-center gap-4 py-16 text-center">
			<h1 className="text-2xl font-bold">Fant ikke siden</h1>
			<p className="text-muted-foreground">Denne siden finnes ikke.</p>
			<Button asChild>
				<Link to="/">Tilbake til forsiden</Link>
			</Button>
		</div>
	);
}

function ErrorBoundary({ error, reset }: ErrorComponentProps) {
	return (
		<div className="flex flex-col items-center gap-4 py-16 text-center">
			<h1 className="text-2xl font-bold">Noe gikk galt</h1>
			<p className="text-muted-foreground">{error.message}</p>
			<div className="flex gap-2">
				<Button variant="outline" onClick={reset}>
					Prøv igjen
				</Button>
				<Button asChild>
					<Link to="/">Tilbake til forsiden</Link>
				</Button>
			</div>
		</div>
	);
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
	head: () => ({
		meta: [
			{
				charSet: "utf-8",
			},
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1",
			},
			{
				title: "BFQ",
			},
		],
		links: [
			{
				rel: "stylesheet",
				href: appCss,
			},
		],
	}),
	notFoundComponent: NotFound,
	errorComponent: ErrorBoundary,
	shellComponent: RootDocument,
});

function RootDocument({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<head>
				<HeadContent />
			</head>
			<body>
				<PageContainer>{children}</PageContainer>
				<Toaster position="bottom-center" duration={2000} />
				<TanStackDevtools
					config={{
						position: "bottom-right",
					}}
					plugins={[
						{
							name: "Tanstack Router",
							render: <TanStackRouterDevtoolsPanel />,
						},
						TanStackQueryDevtools,
					]}
				/>
				<Scripts />
			</body>
		</html>
	);
}
