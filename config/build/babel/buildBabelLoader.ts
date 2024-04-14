import { BuildOptions } from "../types/types";
import { removeDataTestIdBabelPlugin } from "./plugins/removeDataTestIdBabelPlugin";

export function buildBabelLoader({ isDev, isProd }: BuildOptions) {
	const plugins = [];

	if (isProd) {
		plugins.push([removeDataTestIdBabelPlugin, { props: ["data-testid"] }]);
	}

	return {
		test: /\.m?tsx$/,
		exclude: /node_modules/,
		use: {
			loader: "babel-loader",
			options: {
				presets: [
					"@babel/preset-env",
					"@babel/preset-typescript",
					[
						"@babel/preset-react",
						{
							runtime: isDev ? "automatic" : "classic",
						},
					],
				],
				plugins,
			},
		},
	};
}
