import createSchema from './createSchema';
import checkSchema from './checkSchema';

declare global {
  interface Object {
    createSchema: any;
    checkSchema: any;
  } 
}

function configPrototype() {
  

  Object.prototype.createSchema = createSchema;
  Object.prototype.checkSchema = checkSchema;

}

export default configPrototype;
