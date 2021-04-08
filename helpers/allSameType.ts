import kindOf from 'kind-of';
import { compare } from '../compare';
import { typeCheck } from "./typeCheck";

export function allSameType(arr: any[]): boolean {

  let result: boolean = true;
  const type: string | Record<string, unknown> = kindOf(arr[0]);


  switch (type) {
    case 'object':

      // @ts-ignore TODO
      result = arr.every(el => compare(type, typeCheck(el)).score);

      break;
    case 'array':

      result = arr.every(el => allSameType(el));

      // if [[1,2,3],['example','values','in','array'], [null, null,null],[]] this return true 
      // TODO 

      break;
    default:

      if (!arr.every(el => type === typeCheck(el))) result = false;

      break;
  }

  return result;
}
