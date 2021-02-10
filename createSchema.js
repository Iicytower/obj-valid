import kindOf from 'kind-of';

export default function createSchema() {
  const arrayChecking = (arr) => {
    // function allSameType(item) {
    //   return new Set(item.map((x) => typeof x)).size <= 1;
    // } // Check if all values of array are of the same type
    // if (!allSameType(arr))
    //   return new Error("Array can contain only one type of values");


    const value = kindOf(arr[0]);
    let count = "idk";

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

  const mainLoop = (obj) => {
    const res = {};
    for (const prop in obj) {

      if (prop === 'createSchema' || prop === 'checkSchema') break;
      

      const currentType = kindOf(obj[prop]);
      let count = 'idk';

      if (currentType instanceof Error) return currentType;

      if(currentType === 'array'){
        count = arrayChecking(obj[prop]);
      }
      else if(currentType === 'object'){
        count = obj[prop].createSchema();
      }else{
        count = currentType;
      }
    


      res[prop] = count;
    }

    return res;
  };

  return mainLoop(this);
}
