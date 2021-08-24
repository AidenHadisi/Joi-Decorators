import { isConstructor } from "./Types";
import {
	JOI_PARAMETER,
	MethodOrClassDecorator,
	ParameterSchemaData,
} from "./Types";

//Validates method or constructor properties when used with @Valid()
export const Validate =
	(): MethodOrClassDecorator => (target, propertyKey, descriptor) => {
		if (isConstructor(target)) {
			propertyKey = "constructor";
			const original = target;

			let wrapper: any = function (...args: any[]) {
				//Validate constructor params
				validateParameters(target, propertyKey!, args);
				return new original(...args);
			};

			wrapper.prototype = original.prototype;
			return wrapper;
		} else {
			if (!descriptor) return;
			const original = descriptor.value;
			descriptor.value = function (...args: any[]) {
				validateParameters(target, propertyKey!, args);
				return original.apply(this, args);
			};
		}
	};

function validateParameters(
	target: Object,
	propertyKey: string | symbol,
	args: any[]
) {
	let params: ParameterSchemaData[] = Reflect.getOwnMetadata(
		JOI_PARAMETER,
		target,
		propertyKey
	);

	if (params) {
		for (let param of params) {
			const { error } = param.schema.validate(args[param.parameterIndex]);
			if (error instanceof Error) {
				throw error;
			}
		}
	}
}
