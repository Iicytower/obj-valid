export default function checkSchema(schema: Object) {

  if(schema instanceof Error){
    console.error(schema);
    return schema;
  } 
    // @ts-ignore TODO
  const newSchema = this.createSchema()
  return (JSON.stringify(schema) === JSON.stringify(newSchema));
};