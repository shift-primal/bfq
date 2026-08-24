import type { QueryClient } from "@tanstack/react-query";
import {
	createRootRouteWithContext,
	HeadContent,
	Scripts,
} from "@tanstack/react-router";
import { ErrorBoundary } from "#/components/ErrorBoundary";
import { NotFound } from "#/components/NotFound";
import { PageContainer } from "#/components/PageContainer";
import { Toaster } from "#/components/shadcn/sonner";
import appCss from "../styles.css?url";

// import { TanStackDevtools } from "@tanstack/react-devtools";
// import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
// import TanStackQueryDevtools from "../integrations/tanstack-query/devtools";
//
interface MyRouterContext {
	queryClient: QueryClient;
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
				<Toaster
					position="bottom-center"
					duration={2000}
					richColors={true}
					theme={"light"}
				/>
				{/* <TanStackDevtools */}
				{/* 	config={{ */}
				{/* 		position: "bottom-right", */}
				{/* 	}} */}
				{/* 	plugins={[ */}
				{/* 		{ */}
				{/* 			name: "Tanstack Router", */}
				{/* 			render: <TanStackRouterDevtoolsPanel />, */}
				{/* 		}, */}
				{/* 		TanStackQueryDevtools, */}
				{/* 	]} */}
				{/* /> */}
				<Scripts />
			</body>
		</html>
	);
}
