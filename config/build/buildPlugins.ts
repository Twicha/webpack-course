import { Configuration, DefinePlugin, ProgressPlugin } from "webpack";
import path from "path";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";
import HtmlWebpackPlugin from "html-webpack-plugin";
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
import ReactRefreshWebpackPlugin from "@pmmmwh/react-refresh-webpack-plugin";
import CopyWebpackPlugin from "copy-webpack-plugin";
import { BuildOptions } from "./types/types";

export function buildPlugins({
	isDev,
	isProd,
	paths,
	hasAnalyzer,
	platform,
}: BuildOptions): Configuration["plugins"] {
	const plugins: Configuration["plugins"] = [
		new HtmlWebpackPlugin({
			template: paths.html,
			favicon: path.resolve(paths.public, "favicon.ico"),
		}),
		new MiniCssExtractPlugin({
			filename: "css/[name].[contenthash].css",
			chunkFilename: "css/[name].[contenthash].css",
		}),
		new DefinePlugin({
			__PLATFORM__: JSON.stringify(platform),
		}),
	];

	if (isDev) {
		plugins.push(
			new ProgressPlugin(),
			new ForkTsCheckerWebpackPlugin(),
			new ReactRefreshWebpackPlugin(),
		);
	}

	if (isProd) {
		plugins.push(
			new CopyWebpackPlugin({
				patterns: [
					{
						from: path.resolve(paths.public, "locales"),
						to: path.resolve(paths.output, "locales"),
					},
				],
			}),
		);
	}

	if (hasAnalyzer) {
		plugins.push(new BundleAnalyzerPlugin());
	}

	return plugins;
}
