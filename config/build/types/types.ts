export enum BuildMode {
	Production = "production",
	Development = "development",
}

export enum BuildPlatform {
	Mobile = "mobile",
	Desktop = "desktop",
}

export interface BuildPaths {
	entry: string;
	html: string;
	public: string;
	output: string;
	src: string;
}

export interface EnvVariables {
	port: number;
	mode: BuildMode;
	hasAnalyzer?: boolean;
	platform: BuildPlatform;
}

export interface BuildOptions extends EnvVariables {
	paths: BuildPaths;
	isDev: boolean;
	isProd: boolean;
}
