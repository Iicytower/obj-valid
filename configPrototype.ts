import {createSchema} from './createSchema';
import {checkSchema} from './checkSchema';
declare global {
  interface Object {
    createSchema: any;
    checkSchema: any;
  } 
}

export function configPrototype() {
  
  Object.prototype.createSchema = function (){
    return createSchema(this);
  };

  Object.prototype.checkSchema = function (schema: Record<string, unknown>){
    return checkSchema(schema, this);
  };

}