import { AnySchema } from "joi";
export type Constructor<T> = {
	new (...args: any[]): T;
};

export type MethodOrClassDecorator = <T>(
	target: Constructor<T> | Object,
	propertyKey?: string | symbol,
	descriptor?: TypedPropertyDescriptor<any>
) => any;

export type PropertyOrParameterDecorator = (
	target: Object,
	propertyKey: string | symbol,
	parameterIndex?: number
) => void;

export interface ParameterSchemaData {
	parameterIndex: number;
	schema: AnySchema;
}

export const JOI_PARAMETER = "Joi::Parameter";

export const isConstructor = <T>(
	target: Constructor<T> | Object
): target is Constructor<T> => {
	return typeof target === "function";
};
