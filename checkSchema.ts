import kindOf from 'kind-of';
import { createSchema } from './createSchema';

export function checkSchema(schema: Record<string, unknown>, toCheckObj: Record<string, any>): boolean {
  const newSchema = createSchema(toCheckObj); 

  const compare = (obj1: Record<string, any>, obj2: Record<string, any>): boolean => {
    let result = true;
    for (const key in obj1) {
      if (!obj1.hasOwnProperty(key)) break;
        if(kindOf(obj1[key]) === 'object'){
          if(!compare(obj1[key], obj2[key])) result = false
        }else{
          if(obj1[key] !== obj2[key]) result = false;
        }
    }
    return result;
  };
  return compare(schema, newSchema);

};