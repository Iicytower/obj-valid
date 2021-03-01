import { createSchema } from './createSchema';
import { checkSchema } from './checkSchema';
import { CompareResult } from "./interfaces";


export class Schema {

  public readonly schema: Record<string, unknown>;

  constructor(baseObj: Record<string, unknown>, ownSchema: boolean = false) {

    if(ownSchema) this.schema = baseObj;
    else this.schema = createSchema(baseObj)
  }

  public check(this: Schema, obj: Record<string, unknown>): CompareResult {
    return checkSchema(this.schema, obj)
  }

}