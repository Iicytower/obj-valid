import kindOf from 'kind-of';
import { CompareResult }from './interfaces';


export const compare = (obj1: Record<string, any>, obj2: Record<string, any>): CompareResult => {
  let result: CompareResult = {
    score: true,
    wrongProperties: [],
  };
  for (const key in obj1) {
    if (!Object.prototype.hasOwnProperty.call(obj1, key)) continue;
      if(kindOf(obj1[key]) === 'object'){
        if(!compare(obj1[key], obj2[key])) {
          result.score = false;
          result.wrongProperties.push(String(key));
        }
      }else{
        if(obj1[key] !== obj2[key]) {
          result.score = false;
          result.wrongProperties.push(String(key));
        }
      }
  }
  return result;
};