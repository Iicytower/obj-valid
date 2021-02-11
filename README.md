# isObjectHasCorrectStructure

This package can check is your object has correct structure without using typescript. As you know after transpilation interfaces disappear. If you want to check object structure on production or in clean javascript you can use this package.

## Installation

`npm i isObjectHasCorrectStructure` 

## Usage

You have three options to use it:

### 1. You can use functions.

```javascript
import { createSchema, checkSchema } from "isObjectHasCorrectStructure";
// or
const { createSchema, checkSchema } = require("isObjectHasCorrectStructure");

const schema = createSchema(objectFromWhichTheSchemaWillBeCreated);

if (checkSchema(schema, objectToCheck)) {
  // Your awesome code
}
```

### 2. You can use class

```javascript
import { Schema } from "isObjectHasCorrectStructure";
// or
const { Schema } = require("isObjectHasCorrectStructure");

const schema = new Schema(objectFromWhichTheSchemaWillBeCreated);

if (schema.check(objectToCheck)) {
  // Your awesome code
}
```

### 3. You can add methods to object prototype. <span style="color: red;"><b>Not recomended method</b></span>.

```javascript
import { configPrototype } from "isObjectHasCorrectStructure";
// or
const { configPrototype } = require("isObjectHasCorrectStructure");

configPrototype(); // this function adds methods to object prototype
const schema = objectFromWhichTheSchemaWillBeCreated.createSchema();

if (objectToCheck.checkSchema(schema)) {
  // Your awesome code
}
```
If you use this method you can't use "createSchema" and "checkSchema" as property name.

## Example

```javascript
import  { Schema  as ObjStructure } from "isObjectHasCorrectStructure";

const earth = {
  hello: "Earth",
  age: 4543000000,
}

const venus = {
  hello: "Venus",
  age: 4503000000,
}

const world = {
  hello: "world",
}

const pluton = {
  hello: "pluton",
}

const jupiter = {
  bye: "Jupiter",
  age: 4503000000, 
}

const earthSchema = new ObjStructure(earth);
const worldSchema = new ObjStructure(world);

console.log(earthSchema.check(venus)) // log true
console.log(earthSchema.check(world)); // log false
console.log(earthSchema.check(jupiter)); // log false
console.log(worldSchema.check(jupiter)); // log false
console.log(worldSchema.check(earth)); // log false
console.log(worldSchema.check(venus)); // log false
console.log(worldSchema.check(pluton)); // log true

```

## You can write schema by yourself. Check how schema looks on example object:

```javascript
import { checkSchema } from "isObjectHasCorrectStructure";

const schema = {
  hello: "string",
  number: "number",
  nu: "null",
  und: "undefined",
  bool: "boolean",
  obj: {
    ex: "string",
    nu: "number",
    func: "function",
    arr: {
      type: "array",
      value: "number",
    },
  },
  arr: {
    type: "array",
    value: "number",
  },
  tab: {
    type: "array",
    value: "string",
  },
  reg: "regexp",
  multidimensionalArr: {
    type: "array",
    value: {
      type: "array",
      value: "string",
    },
  },
  objArr: {
    type: "array",
    value: {
      nu: "null",
      simple: "string",
      arr: {
        type: "array",
        value: "number",
      },
      insObjArr: {
        type: "array",
        value: {
          name: "string",
          age: "number",
        },
      },
    },
  },
  objArrObj: {
    nu: "null",
    simple: "string",
    arr: {
      type: "array",
      value: "number",
    },
    insObjArr: {
      type: "array",
      value: {
        name: "string",
        age: "number",
      },
    },
  },
  func: "function",
}

const obj = {
  hello: "world",
  number: 1,
  nu: null,
  und: undefined,
  bool: true,
  obj: {
    ex: "ample",
    nu: 4,
    func: () => "tion",
    arr: [1, 2, 3],
  },
  arr: [1, 2, 3],
  tab: ['1', '2', '3',],
  reg: /./gm,
  multidimensionalArr:
  [['1', '2'], ['3', '4']],
  objArr: [
    {
      nu: null,
      simple: "type",
      arr: [4,5,6],
      insObjArr: [{
        name: 'Daisy',
        age: 18,
      }]
    },
  ],
  objArrObj: {
    nu: null,
    simple: "type",
    arr: [4,5,6],
    insObjArr: [{
      name: 'Daisy',
      age: 18,
    }]
  },
  func: () => 'value',
}
console.log(checkSchema(schema, check)) // log true
```

## Additional remarks

* Remember you can use:
```javascript
import { Schema as MyName } from "isObjectHasCorrectStructure";
// or
const MyName = require("isObjectHasCorrectStructure").Schema;
```

* The same functions are always performed underneath regardless of usage option

* Package returns an object that contain following properties:
```javascript
{
  configPrototype, // this function adds createSchema and checkSchema to object prototype
  Schema, // this is class on basis of which you can create schema object that contains a check method
  checkSchema, // this function returns object schema
  createSchema, // this function returns true or false
}
```
* If object contains an array of objects, this package won't check if all objects has the same structure. It will be fixed in next versions.
* If object contains a multidimensional array, this package won't check nested arrays. It will be fixed in next versions.