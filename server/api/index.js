/**
 * Created by minyi on 2018/1/18.
 */
const article = require('./article');
const passport = require('../passport/passport');
const marked = require('./marked');
const tags = require('./tags');
const sitemap = require('./sitemap');

module.exports = {
    article,
    passport,
    marked,
    tags,
    sitemap
};