/**
 * Created by minyi on 2016/11/29.
 */
const mongoose = require('mongoose');
const Promise = require('bluebird');

let ArticleSchema = mongoose.Schema({
    title: String,
    url: String,
    abstract: String,
    content: String,
    tags:　[],
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
    visited: {
        type: Number,
        default: 0
    },
    is_delete: {
        type: Number,
        default: 0
    },
    miniGramLink: {
        type: String
    }
});

let Article = mongoose.model('article', ArticleSchema);
Promise.promisifyAll(Article);
Promise.promisifyAll(Article.prototype);

module.exports = Article;
