import {createSchema} from './createSchema';
import {checkSchema} from './checkSchema';


export class Schema {

  public readonly schema: Record<string, unknown>;

  constructor(baseObj: Record<string, unknown> ){
    this.schema = createSchema(baseObj)
  }

  public check(this: Schema, obj: Record<string, unknown>): boolean | Error{
    return checkSchema(this.schema, obj)
  }

}