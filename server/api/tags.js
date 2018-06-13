/**
 * Created by minyi on 2018/6/6.
 */
let Article = require('../models/article.js');
let _ = require('lodash');

exports.getTagPage = (req, res, next) => {
    Article.find({}, (err, posts) => {
        if (err) {
            return next();
        }
        let tags = [];
        posts.forEach(post => {
            tags = tags.concat(post.tags);
        });
        tags = _.uniq(tags);
        res.render('tags/index', {tags: tags})
    })
};

exports.getTagItem = (req, res, next) => {
    let tag = req.params.tag;
    Article.find({tags: tag}, function (err, posts) {
        if (err) {
            return next(err);
        }
        res.render('tags/tag', {title: tag, blogs: posts});
    })
};