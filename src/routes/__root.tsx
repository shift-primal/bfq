import type { QueryClient } from "@tanstack/react-query";
import {
	createRootRouteWithContext,
	HeadContent,
	Scripts,
} from "@tanstack/react-router";
import { ThemeProvider } from "next-themes";
import { ErrorBoundary } from "#/components/ErrorBoundary";
import { NotFound } from "#/components/NotFound";
import { PageContainer } from "#/components/PageContainer";
import { Toaster } from "#/components/shadcn/sonner";
import { ThemeToggle } from "#/components/ThemeToggle";
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
		<html lang="no" suppressHydrationWarning>
			<head>
				<HeadContent />
			</head>
			<body>
				<ThemeProvider
					attribute="class"
					defaultTheme="light"
					enableSystem={false}
				>
					<div className="fixed top-4 left-4 z-50">
						<ThemeToggle />
					</div>
					<PageContainer>{children}</PageContainer>
					<Toaster position="bottom-center" duration={2000} richColors={true} />
				</ThemeProvider>
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
