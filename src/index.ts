if (typeof Reflect === "undefined" || !Reflect.getMetadata) {
	throw new Error(
		`This pacakge requires a reflect polyfill. Please add 'import "reflect-metadata"' to the top of your entry point.`
	);
}

export * from "./Valid";
export * from "./Validate";
