import Joi, { ValidationError } from "joi";
import { Validate } from "../Validate";
import { Valid } from "../Valid";

let testSchema = Joi.string().max(5);

describe("./Validate", () => {
	test("should check constructor parameters", () => {
		@Validate()
		class Test {
			private _s: string;

			constructor(@Valid(testSchema) s: string) {
				this._s = s;
			}

			get s() {
				return this._s;
			}
		}

		expect(() => {
			new Test("invalid");
		}).toThrow(ValidationError);
	});

	test("should exec constructor when valid", () => {
		@Validate()
		class Test {
			private _s: string;

			constructor(@Valid(testSchema) s: string) {
				this._s = s;
			}

			get s() {
				return this._s;
			}
		}

		let test = new Test("valid");
		expect(test.s).toBe("valid");
	});

	test("should check method parameters", () => {
		class Test {
			private _s: string;

			constructor() {
				this._s = "valid";
			}

			get s() {
				return this._s;
			}

			@Validate()
			public test(@Valid(testSchema) s: string) {
				this._s = s;
			}
		}

		let test = new Test();
		expect(() => test.test("invalid")).toThrowError(ValidationError);
	});

	test("should exec method if valid", () => {
		class Test {
			private _s: string;

			constructor() {
				this._s = "valid";
			}

			get s() {
				return this._s;
			}

			@Validate()
			public test(@Valid(testSchema) s: string) {
				this._s = s;
			}
		}

		let test = new Test();
		test.test("valid");
		expect(test.s).toBe("valid");
	});
});
