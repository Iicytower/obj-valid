import kindOf from 'kind-of';
import { CompareResult } from './interfaces';


export const compare = (obj1: Record<string, any>, obj2: Record<string, any>): CompareResult => {

  // function taken from https://javascript.plainenglish.io/4-ways-to-compare-objects-in-javascript-97fe9b2a949c

  let result: CompareResult = {
    score: true,
    wrongProperties: [],
  };

  const props1: string[] = Object.getOwnPropertyNames(obj1);
  const props2: string[] = Object.getOwnPropertyNames(obj2);

  if (props1.length != props2.length) {
    result.score = false;
    return result;
  }

  for (let i = 0; i < props1.length; i++) {
    const prop = props1[i];

    if (
      (props1[0] === "type" && props1[1] === "value") &&
      (props2[0] === "type" && props2[1] === "value")
    ) {
      if(obj1.type === 'array' && obj1.value === 'any'){
        obj1.value = obj2.value;
      }
    }

    const bothAreObjects: boolean = (kindOf(obj1[prop]) === 'object' && kindOf(obj2[prop]) === 'object');

    if (
      (!bothAreObjects && (obj1[prop] !== obj2[prop])) ||
      (bothAreObjects && !compare(obj1[prop], obj2[prop]).score)
    ) {
      result.score = false;
      result.wrongProperties.push(prop);
    }
  }
  return result;
};