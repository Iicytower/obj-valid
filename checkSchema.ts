import createSchema from './createSchema';

export function checkSchema(schema: Record<string, unknown>, toCheckObj: Object) {

  if(schema instanceof Error){
    console.error(schema);
    return schema;
  } 
  const newSchema = createSchema(toCheckObj)
  return (JSON.stringify(schema) === JSON.stringify(newSchema));
};