import { createSchema } from './createSchema';
import { compare } from './compare';
import { CompareResult } from './interfaces';

export function checkSchema(schema: Record<string, unknown>, toCheckObj: Record<string, any>): CompareResult {
  const newSchema = createSchema(toCheckObj);
  // console.log(newSchema);
  return compare(schema, newSchema);
};