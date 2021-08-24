export default {
	preset: "ts-jest",
	clearMocks: true,
	coverageDirectory: "coverage",
	collectCoverageFrom: ["src/**/*.ts"],

	testPathIgnorePatterns: ["/node_modules/"],
	setupFilesAfterEnv: ["./jest.setup.ts"],
	testEnvironment: "node",
};
