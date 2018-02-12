/**
 * Created by minyi on 2017/11/28.
 */
const env = process.env.NODE_ENV || 'development';

module.export = require(`./${env}.js`);