import kindOf from 'kind-of';

export function createSchema(baseObj: Object, ) {

  const arrayChecking = (arr: any[]): string | Object | Error => {
    function allSameType(item: any): boolean {
      return new Set(item.map((x: any) => kindOf(x))).size <= 1;
    } // Check if all values of array are of the same type
    if (!allSameType(arr)){
      return new Error("Array can contain only one type of values");
    }

    const value: string = kindOf(arr[0]);

    let count: string | Object = "idk";
    switch (value) {
      case 'array':
        count = arrayChecking(arr[0])
        break;
      case 'object':
        count = createSchema(arr[0])
        break;
    
      default:
        count = value;
        break;
    }

    return {
      type: "array",
      value: count,
    };
  };

  const mainLoop = (obj: any) => {
    const res: any = {};
    for (const prop in obj) {

      if(!obj.hasOwnProperty(prop)) break;
      
      const currentType: string | Object = kindOf(obj[prop]);
      
      let count: string | Object = 'idk';
      switch (currentType) {
        case 'array':
          count = arrayChecking(obj[prop]);
          break;

        case 'object':
          count = createSchema(obj[prop]);
          break;

        default:
          count = currentType;
          break;
      }   
      res[prop] = count;
    }
    
    return res;
  };
  
  return mainLoop(baseObj);
}
