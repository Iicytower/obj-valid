import {createSchema} from './createSchema';
import {checkSchema} from './checkSchema';
import { CompareResult } from "./interfaces";
declare global {
  interface Object {
    createSchema: any;
    checkSchema: any;
  } 
}

export function configPrototype() {
  
  Object.prototype.createSchema = function (): Record<string, unknown>{
    // @ts-ignore
    return createSchema(this);
  };

  Object.prototype.checkSchema = function (schema: Record<string, unknown>): CompareResult{
    return checkSchema(schema, this);
  };

}