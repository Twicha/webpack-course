import webpack from "webpack";
import { buildWebpack, BuildMode, BuildOptions, BuildPlatform, EnvVariables } from "./config";
import path from "path";

const defaultEnv: Partial<EnvVariables> = {
	mode: BuildMode.Development,
	port: 3000,
	platform: BuildPlatform.Desktop,
};

export default (incomingEnv: EnvVariables) => {
	const preparedEnv = { ...defaultEnv, ...incomingEnv };
	const { mode } = preparedEnv;

	const options: BuildOptions = {
		...preparedEnv,
		paths: {
			entry: path.resolve(__dirname, "src", "index.tsx"),
			output: path.resolve(__dirname, "build"),
			html: path.resolve(__dirname, "public", "index.html"),
			public: path.resolve(__dirname, "public"),
			src: path.resolve(__dirname, "src"),
		},
		isProd: mode === BuildMode.Production,
		isDev: mode === BuildMode.Development,
	};
	const config: webpack.Configuration = buildWebpack(options);

	return config;
};
