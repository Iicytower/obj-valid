import { typeCheck } from "./typeCheck";
import { allSameType } from "./allSameType";

export function arrayChecking (arr: any[]): string | Record<string, unknown> {

  if(arr.length === 0) return {
    type: "array",
    value: "any",
  };


  if (!allSameType(arr)) {
    throw new Error("Array can contain only one type of values");
  }

  return {
    type: "array",
    value: typeCheck(arr[0]),
  };
};