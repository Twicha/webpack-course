import MiniCssExtractPlugin from "mini-css-extract-plugin";
import { ModuleOptions } from "webpack";
import ReactRefreshTypescript from "react-refresh-typescript";
import { BuildOptions } from "./types/types";
import { buildBabelLoader } from "./babel/buildBabelLoader";

export function buildLoaders(options: BuildOptions): ModuleOptions["rules"] {
	const { isDev } = options;

	const assetLoader = {
		test: /\.(png|jpg|jpeg|gif)$/i,
		type: "asset/resource",
	};

	const svgrLoader = {
		test: /\.svg$/,

		use: [
			{
				loader: "@svgr/webpack",
				options: {
					icon: true,
					svgoConfig: {
						plugins: [
							{
								name: "convertColors",
								params: {
									currentColor: true,
								},
							},
						],
					},
				},
			},
		],
	};

	const cssLoaderWithModules = {
		loader: "css-loader",
		options: {
			modules: {
				localIdentName: `${isDev ? "[path][name]__[local]--" : ""}[hash:base64:8]`,
			},
		},
	};

	const scssLoader = {
		test: /\.s[ac]ss$/i,
		use: [MiniCssExtractPlugin.loader, cssLoaderWithModules, "sass-loader"],
	};

	// const tsLoader = {
	// 	exclude: /node_modules/,
	// 	test: /\.tsx?$/,
	// 	use: [
	// 		{
	// 			loader: "ts-loader",
	// 			options: {
	// 				transpileOnly: true,
	// 				getCustomTransformers: () => ({
	// 					before: [isDev && ReactRefreshTypescript()].filter(Boolean),
	// 				}),
	// 			},
	// 		},
	// 	],
	// };

	const babelLoader = buildBabelLoader(options);

	return [
		assetLoader,
		scssLoader,
		// tsLoader,
		babelLoader,
		svgrLoader,
	];
}
