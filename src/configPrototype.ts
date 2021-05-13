import { createSchema } from './createSchema';
import { checkSchema } from './checkSchema';
import { CompareResult } from './interfaces';
declare global {
  interface Object {
    createSchema(): Record<string, unknown>;
    checkSchema(schema: Record<string, unknown>): CompareResult;
  }
}

export function configPrototype() {
  Object.prototype.createSchema = function (
    this: Record<string, unknown>,
  ): Record<string, unknown> {
    return createSchema(this);
  };

  Object.prototype.checkSchema = function (
    schema: Record<string, unknown>,
  ): CompareResult {
    return checkSchema(schema, this);
  };
}
