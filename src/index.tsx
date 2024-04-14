import { Suspense } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { LazyAboutPage, LazyShopPage } from "@/pages";
import { App } from "./App";

const root = document.getElementById("root");

if (!root) {
	throw new Error("Root wasn't found");
}

const container = createRoot(root);

const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
		children: [
			{
				path: "/about",
				element: (
					<Suspense fallback={<div>Loading...</div>}>
						<LazyAboutPage />
					</Suspense>
				),
			},
			{
				path: "/shop",
				element: (
					<Suspense fallback={<div>Loading...</div>}>
						<LazyShopPage />
					</Suspense>
				),
			},
		],
	},
]);

container.render(<RouterProvider router={router} />);
