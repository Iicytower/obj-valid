import createSchema from './createSchema.js';
import checkSchema from './checkSchema.js';

function config() {
  Object.prototype.createSchema = createSchema;
  Object.prototype.checkSchema = checkSchema;

}

export default config;
