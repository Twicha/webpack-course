import webpack from "webpack";
import { BuildMode, BuildOptions } from "./types/types";
import { buildDevServer } from "./buildDevServer";
import { buildLoaders } from "./buildLoaders";
import { buildPlugins } from "./buildPlugins";
import { buildResolvers } from "./buildResolvers";

export function buildWebpack(options: BuildOptions): webpack.Configuration {
	const { isDev, paths, mode } = options;

	return {
		mode,
		// от куда брать
		entry: paths.entry,
		// куда класть результат
		output: {
			path: paths.output,
			filename: "[name].[contenthash].js",
			clean: true,
		},
		plugins: buildPlugins(options),
		module: {
			rules: buildLoaders(options),
		},
		resolve: buildResolvers(options),
		devtool: isDev ? "eval-cheap-module-source-map" : "source-map",
		devServer: isDev ? buildDevServer(options) : undefined,
	};
}
