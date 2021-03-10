# obj-valid

This package can check is your object has correct structure without using typescript. As you know after transpilation interfaces disappear. If you want to check object structure on production or in plain javascript you can use this package.

Please send me feedback or maybe you have any idea to add new functionality to this package.

## Installation

Run `npm i obj-valid` or download it directly from git repository `https://github.com/Iicytower/obj-valid`

## Why you should use it?

This package is very fast, simple to use, it has only one dependency to package without dependencies. You can write schema by yourself or `createSchema` function can create it for you. If you have any idea how to improve it or what to add, send me an e-mail.

## Usage

You have three ways to use it:

### 1. You can use functions.

```javascript
import { createSchema, checkSchema } from "obj-valid";
// or
const { createSchema, checkSchema } = require("obj-valid");

const schema = createSchema(objectFromWhichTheSchemaWillBeCreated);

if (!checkSchema(schema, objectToCheck).score) {
  return new Error()
}
  // Your awesome code
```

### 2. You can use class

```javascript
import { Schema } from "obj-valid";
// or
const { Schema } = require("obj-valid");

const schema = new Schema(objectFromWhichTheSchemaWillBeCreated);

if (!schema.check(objectToCheck).score) {
  return new Error()
}
  // Your awesome code
```

also you can out into constructor your own schema:

```javascript

const schema = new Schema(yourOwnSchema, true);

if (!schema.check(objectToCheck).score) {
  return new Error()
}
  // Your awesome code
```
If second argument is true(default false) `schema` object will be created directly from object in first argument,

### 3. You can add methods to object prototype. <span style="color: red;"><b>This method is not recomended!</b></span>

```javascript
import { configPrototype } from "obj-valid";
// or
const { configPrototype } = require("obj-valid");

configPrototype(); // this function adds methods to object prototype
const schema = objectFromWhichTheSchemaWillBeCreated.createSchema();

if (!objectToCheck.checkSchema(schema).score) {
  return new Error()
}
  // Your awesome code
```
If you use this method you can't use "createSchema" and "checkSchema" as property name.

## Example

```javascript
import  { Schema  as ObjStructure } from "obj-valid";

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

console.log(earthSchema.check(venus).score) // log true
console.log(earthSchema.check(world).score); // log false
console.log(earthSchema.check(jupiter).score); // log false
console.log(worldSchema.check(jupiter).score); // log false
console.log(worldSchema.check(earth).score); // log false
console.log(worldSchema.check(venus).score); // log false
console.log(worldSchema.check(pluton).score); // log true

```

## You can write schema by yourself. Check how schema looks on example object:

```javascript
import { checkSchema } from "obj-valid";

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
console.log(checkSchema(schema, check).score) // log true
```

## Additional remarks

* Remember you can use:
```javascript
import { Schema as MyName } from "obj-valid";
// or
const MyName = require("obj-valid").Schema;
```

* The same functions are always performed underneath regardless of usage option

* `checkSchema` return an object:
```javascript
{
  score: true, // this property say is object fits schema
  wrongProperties: [], // this is an array contain strings with not matching properties
}
```
If `score` is `false` and `wrongProperties` is empty array it means count of properties object and schema is different.

* There is possible to type `any` in arrays. If in based object is an empty array, all values will be correct. The other way around. If in the object to be checked is an empty array all values will be correct.

* Package returns an object that contain following properties:
```javascript
{
  configPrototype,
  Schema,
  checkSchema,
  createSchema,
}
```

* The more convenient use for validate on routes will be added in next versions.