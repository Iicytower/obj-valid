import createSchema from './createSchema';

export default function checkSchema(schema: Object, toCheckObj: Object) {

  if(schema instanceof Error){
    console.error(schema);
    return schema;
  } 
  const newSchema = createSchema(toCheckObj)
  return (JSON.stringify(schema) === JSON.stringify(newSchema));
};