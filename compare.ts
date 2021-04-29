import kindOf from 'kind-of';
import { CompareResult } from './interfaces';

export const compare = (
  schema: Record<string, any>,
  newSchema: Record<string, any>,
): CompareResult => {
  // function basis taken from https://javascript.plainenglish.io/4-ways-to-compare-objects-in-javascript-97fe9b2a949c

  const result: CompareResult = {
    score: true,
    wrongProperties: [],
  };

  const notRequirePropertiesProblemResult: CompareResult = {
    score: false,
    wrongProperties: ['notRequireProperties'],
  };

  const doesNotRequirePropertiesExist: boolean = schema.hasOwnProperty(
    'notRequireProperties',
  );
  /*
    check is this property is an array of strings.
  */
  if (doesNotRequirePropertiesExist) {
    if (!Array.isArray(schema.notRequireProperties)) {
      return notRequirePropertiesProblemResult;
    }
    if (
      schema.notRequireProperties.every((element: string) => typeof element !== 'string')
    ) {
      return notRequirePropertiesProblemResult;
    }
  }

  const props1: string[] = Object.getOwnPropertyNames(schema);
  const props2: string[] = Object.getOwnPropertyNames(newSchema);

  // if (props1.length != props2.length) {
  //   result.score = false;
  //   return result;
  // }

  for (let i = 0; i < props1.length; i++) {
    const prop = props1[i];
    if (prop === 'notRequireProperties') continue;

    if (
      props1[0] === 'type' &&
      props1[1] === 'value' &&
      props2[0] === 'type' &&
      props2[1] === 'value'
    ) {
      if (schema.type === 'array' && schema.value === 'any') {
        schema.value = newSchema.value;
      }
      if (newSchema.type === 'array' && newSchema.value === 'any') {
        newSchema.value = schema.value;
      }
    }

    const bothAreObjects: boolean =
      kindOf(schema[prop]) === 'object' && kindOf(newSchema[prop]) === 'object';

    if (
      (!bothAreObjects && schema[prop] !== newSchema[prop]) ||
      (bothAreObjects && !compare(schema[prop], newSchema[prop]).score)
    ) {
      if (
        doesNotRequirePropertiesExist &&
        schema.notRequireProperties.indexOf(prop) !== -1
      ) {
        continue;
      }
      result.score = false;
      result.wrongProperties.push(prop);
    }
  }
  return result;
};
