import Joi, { ValidationError } from "joi";
import { Valid } from "../Valid";

let testSchema = Joi.string().max(5);

describe("./Valid", () => {
	test("should throw when constructing", () => {
		class Test {
			@Valid(testSchema) public s: string;

			constructor() {
				this.s = "invalid";
			}
		}
		expect(() => {
			new Test();
		}).toThrow(ValidationError);
	});

	test("should throw when setting", () => {
		class Test {
			@Valid(testSchema) private _s: string;

			constructor() {
				this._s = "valid";
			}

			set s(val: string) {
				this._s = val;
			}

			get s() {
				return this._s;
			}
		}
		let test = new Test();
		expect(() => {
			test.s = "invalid";
		}).toThrow(ValidationError);

		test.s = "good";
		expect(test.s).toBe("good");
	});
});
