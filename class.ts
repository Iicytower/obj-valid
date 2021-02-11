import createSchema from './createSchema';
import checkSchema from './checkSchema';


class Schema {

  constructor(public readonly obj: Object ){
    createSchema(obj)
  }

  public check(this: any, obj: Object): boolean | Error{
    return checkSchema(this, obj)
  }

}

export default Schema;