import createSchema from './createSchema';
import checkSchema from './checkSchema';


class Schema {

  public readonly schema: Record<string, unknown>;

  constructor(baseObj: Record<string, unknown> ){
    this.schema = createSchema(baseObj)
  }

  public check(this: any, obj: Record<string, unknown>): boolean | Error{
    return checkSchema(this.schema, obj)
  }

}

export default Schema;