import { AnySchema } from "joi";
import {
	JOI_PARAMETER,
	ParameterSchemaData,
	PropertyOrParameterDecorator,
} from "./Types";

//Validates a class property or a method parameter using provided Joi schema
export const Valid =
	(schema: AnySchema): PropertyOrParameterDecorator =>
	(target, propertyKey, parameterIndex) => {
		if (parameterIndex !== undefined) {
			propertyKey =
				typeof propertyKey === "undefined" ? "constructor" : propertyKey;
			let existingParameters: ParameterSchemaData[] =
				Reflect.getOwnMetadata(JOI_PARAMETER, target, propertyKey) || [];
			existingParameters.push({
				parameterIndex: parameterIndex,
				schema: schema,
			});
			Reflect.defineMetadata(
				JOI_PARAMETER,
				existingParameters,
				target,
				propertyKey
			);
		} else {
			let key = propertyKey as keyof Object;
			let val = target[key];
			Object.defineProperty(target, propertyKey, {
				get: () => {
					return val;
				},
				set: (newVal: any) => {
					let { error } = schema.validate(newVal);
					if (error instanceof Error) {
						throw error;
					}
					val = newVal;
				},
			});
		}
	};
