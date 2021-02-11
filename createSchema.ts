import kindOf from 'kind-of';

export default function createSchema() {
  const arrayChecking = (arr: any[]) => {
    function allSameType(item: any): boolean {
      return new Set(item.map((x: any) => typeof x)).size <= 1;
    } // Check if all values of array are of the same type
    if (!allSameType(arr))
      return new Error("Array can contain only one type of values");


    const value = kindOf(arr[0]);
    let count: any = "idk";

    switch (value) {
      case 'array':
        count = arrayChecking(arr[0])
        break;
      case 'object':
        count = arr[0].createSchema()
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
      
      const currentType: any = kindOf(obj[prop]);
      let count: any = 'idk';

      if (currentType instanceof Error) return currentType;

      switch (currentType) {
        case 'array':
          count = arrayChecking(obj[prop]);
          break;

        case 'object':
          count = obj[prop].createSchema();
          break;

        default:
          count = currentType;
          break;
      }   
      res[prop] = count;
    }
    
    return res;
  };
  // @ts-ignore TODO
  return mainLoop(this);
}
