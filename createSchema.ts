import kindOf from 'kind-of';

export function createSchema(baseObj: Record<string, unknown>): Record<string, unknown> {

  try {

    const typeCheck = (value: any): string | Record<string, unknown> => {

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

    const arrayChecking = (arr: any[]): string | Record<string, unknown> => {

      function allSameType(arr: any[]): boolean {

        const type = JSON.stringify(typeCheck(arr[0]));

        const result = arr.reduce((acc, el) => {

          if (JSON.stringify(typeCheck(el)) !== type) acc = false
          return acc;
        }, true);
        return result;
      } // Check if all values of array are of the same type

      if (!allSameType(arr)) {

        throw new Error("Array can contain only one type of values");
      }

      return {
        type: "array",
        value: typeCheck(arr[0]),
      };
    };

    const mainLoop = (obj: Record<string, unknown>): Record<string, unknown> => {
      const res: any = {};
      for (const prop in obj) {

        if (!obj.hasOwnProperty(prop)) break;

        const type: string | Record<string, unknown> = typeCheck(obj[prop]);

        res[prop] = type;
      }

      return res;
    };

    return mainLoop(baseObj);

  } catch (err) {
    return err;
  }

}
