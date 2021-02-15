import kindOf from 'kind-of';

export function createSchema(baseObj: Object, ) {

  const typeCheck = (value: any) => { //TODO type

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

  const arrayChecking = (arr: any[]): string | Object | Error => {
    function allSameType(item: any): boolean {
      return new Set(item.map((x: any) => kindOf(x))).size <= 1;
    } // Check if all values of array are of the same type
    if (!allSameType(arr)){
      return new Error("Array can contain only one type of values");
    }

    return {
      type: "array",
      value: typeCheck(arr[0]),
    };
  };

  const mainLoop = (obj: any) => {
    const res: any = {};
    for (const prop in obj) {

      if(!obj.hasOwnProperty(prop)) break;
      
      res[prop] = typeCheck(obj[prop]);
    }
    
    return res;
  };
  
  return mainLoop(baseObj);
}
