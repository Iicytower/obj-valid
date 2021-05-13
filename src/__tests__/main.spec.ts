import { Schema, createSchema, checkSchema } from "../../index";

const exampleSchema = {
  hello: 'string',
  number: 'number',
  nu: 'null',
  arr: {
    type: 'array',
    value: 'number',
  },
  tab: {
    type: 'array',
    value: 'string',
  },
  und: 'undefined',
  bool: 'boolean',
  obj: {
    ex: 'string',
    nu: 'number',
    func: 'function',
    arr: {
      type: 'array',
      value: 'number',
    },
  },
  reg: 'regexp',
  func: 'function',
};

const exampleObject = {
  hello: 'world',
  number: 1,
  nu: null,
  arr: [1, 2, 3],
  tab: ['one', 'two', 'three'],
  und: undefined,
  bool: true,
  obj: {
    ex: 'ample',
    nu: 4,
    func: () => 'tion',
    arr: [1, 2, 3],
  },
  reg: /./gm,
  func: () => 'value',
};

test('temporary', async () => {

  const sch = new Schema(exampleSchema, true);

  expect(sch.check(exampleObject).score).toBe(true);

  expect(checkSchema(exampleSchema, exampleObject).score).toBe(true);

});