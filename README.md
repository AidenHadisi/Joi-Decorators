# Joi-Decorators

> Joi validation decorators for TypeScript.

Easily validate your classes, method parameters, and properties using Joi decorators.

## Install

Install using **npm**:

```
$ npm install @aidenhadisi/joi-decorators
```

Or using **yarn**:

```
$ yarn add @aidenhadisi/joi-decorators
```

## Usage

### Validate Class Properties

`Valid` decorator validates class properties whenever the property is set or modified. Anytime the value is modified the validation schema will be applied.

```js
import { Valid } from "@aidenhadisi/joi-decorators";

//Create a Joi Schema:
let schema = Joi.string().max(5);

class Employee {
	//Pass schema to decorator
	@Valid(schema)
	public id: string

	public name: string;

	constructor() {
		this.name = "John Doe"
		this.id = "valid";
	}
}

let employee = new Employee();

//Throws Joi.ValidationError
employee.id = "invalid";

```

Furthermore, If an invalid value is provided during the class construction, the constructor function will throw.

```js
import { Valid } from "@aidenhadisi/joi-decorators";

//Create a Joi Schema:
let schema = Joi.string().max(5);

class Employee {
	//Pass schema to decorator
	@Valid(schema)
	public id: string

	public name: string;

	constructor() {
		this.name = "John Doe"
		//Invalid value in constructor
		this.id = "Invalid";
	}
}

//Throws Joi.ValidationError
let employee = new Employee();


```

### Validating Constructor Parameters

`Validate` and `Valid` decorators can be used to validate constructor parameters.

```js
import { Valid, Validate } from "@aidenhadisi/joi-decorators";

//Create a Joi Schema:
let schema = Joi.string().max(5);

//Mark class with Validate
@Validate()
class Employee {
	public id: string
	public name: string;

	//Mark the parameter with Valid decorator and pass the Joi schema
	constructor(@Valid(schema) id: string) {
		this.name = "John Doe"
		this.id = id;
	}
}

//Throws Joi.ValidationError
let employee = new Employee("Invalid");


```

### Validating Method Parameters

`Validate` and `Valid` decorators can be used to validate method parameters.

```js
import { Valid, Validate } from "@aidenhadisi/joi-decorators";

//Create a Joi Schema:
let schema = Joi.string().max(5);

class Employee {
	public id: string
	public name: string;

	constructor() {
		this.name = "John Doe"
		this.id = "valid";
	}

	//Mark the method with validate
	//and mark the parameter with Valid decorator and pass the Joi schema
	@Validate()
	public changeId(@Valid(schema) id: string) {
		this.id = id;
	}
}


let employee = new Employee();

//Throws Joi.ValidationError
employee.changeId("invalid");

```

### Contributing

Contributions are welcome. Feel free to add new features and improve the code.
