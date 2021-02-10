export default function checkSchema(schema) {

  if(schema instanceof Error){
    console.error(schema);
    return schema;
  } 

  const newSchema = this.createSchema()
  return (JSON.stringify(schema) === JSON.stringify(newSchema));
};