import kindOf from 'kind-of';
import { arrayChecking } from "./arrayChecking";
import { createSchema } from "../createSchema";

export function typeCheck (value: any): string | Record<string, unknown>{

  const currentType: string = kindOf(value);

  switch (currentType) {
    case 'array':
      return arrayChecking(value);
      break;

    case 'object':
      return createSchema(value);
      break;

    default:
      return currentType;
      break;
  }
}