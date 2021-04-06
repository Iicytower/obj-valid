import kindOf from 'kind-of';
import { compare } from '../compare';
import { typeCheck } from "./typeCheck";

export function allSameType(arr: any[]): boolean {

  let result: boolean = true;
  const type = typeCheck(arr[0]);

  if(kindOf(type) !== 'object'){
    console.log('not object', type);
    
    

  }else{
    console.log('object', type);
  }

  return result;
} 
