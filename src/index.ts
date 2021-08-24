if (typeof Reflect === "undefined" || !Reflect.getMetadata) {
	throw new Error(
		`This pacakge requires a reflect polyfill. Please add 'import "reflect-metadata"' to the top of your entry point.`
	);
}

export { Valid } from "./Valid";
export { Validate } from "./Validate";
