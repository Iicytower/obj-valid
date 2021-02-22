import { createSchema } from './createSchema';

export function checkSchema(schema: Record<string, unknown>, toCheckObj: Record<string, any>):  boolean {
  const newSchema = createSchema(toCheckObj)
  return (JSON.stringify(schema) === JSON.stringify(newSchema));
};