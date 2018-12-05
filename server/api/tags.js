/**
 * Created by minyi on 2018/6/6.
 */
let Article = require('../models/article.js');
let _ = require('lodash');
let moment = require('moment');

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
    let filter = {is_delete: 0, tags: [tag]};
    let fields = 'title url abstract tags visited like createdAt';
    let indexPages = 20;
    let sort = '-createdAt';

    Article.find(filter, fields).sort(sort).limit(indexPages).lean()
        .then(posts => {
            posts.forEach(item => {
                item.createdAt = moment(item.createdAt).format('YYYY-MM-DD');
            });
            res.render('index', {posts: posts, page: tag});
        }).catch(err => {
        console.log(err);
    })
};

