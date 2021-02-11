import createSchema from './createSchema.js';
import checkSchema from './checkSchema.js';

function configPrototype() {
  Object.prototype.createSchema = createSchema;
  Object.prototype.checkSchema = checkSchema;
}

export default configPrototype;
