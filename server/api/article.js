/**
 * Created by minyi on 2017/6/1.
 */
let Article = require('../models/article.js');
let moment = require('moment');
let marked = require('../api').marked;

// 获取接口数据
exports.getList = (req, res) => {
    let by = req.query.by,
        key = req.query.key,
        limit = req.query.size,
        page = req.query.page,
        filter = {is_delete: 0},
        sort = '-createdAt',
        skip, reg;

    page = parseInt(page, 10) || 1;
    limit = parseInt(limit, 10) || 10;
    skip = (page - 1) * limit;

    if (key) {
        reg = new RegExp(key, 'i');
        filter.title = {$regex: reg};
    }
    if (by) {
        sort = '-' + by;
    }

    let fields = 'title url abstract tags visited like createdAt';

    Promise.all([
        Article.find(filter, fields).sort(sort).skip(skip).limit(limit).exec(),
        Article.count(filter)
    ]).then(([data, total]) => {
        let totalPage = Math.ceil(total / limit);
        let hasMore = page * limit < total;
        res.send({
            data: data,
            total: total,
            hasMore: hasMore,
            err_code: 0
        });
    });
};
// 前端首页渲染
exports.renderIndex = (req, res) => {
    let filter = {is_delete: 0};
    let fields = 'title url abstract tags visited like createdAt';
    let indexPages = 10;
    let sort = '-createdAt';

    Article.find(filter, fields).sort(sort).limit(indexPages).lean()
        .then(posts => {
            posts.forEach(item => {
                item.createdAt = moment(item.createdAt).format('YYYY-MM-DD');
            });
            res.render('index', {posts: posts, index: true});
        }).catch(err => {
        console.log(err);
    })
};

// 获取单篇文章
exports.getItem = (req, res) => {
    const articleId = req.query.id;
    if (!articleId) {
        res.send({
            err_code: -1,
            err_msg: 'no id'
        });
        return;
    }
    let fields = 'title url abstract tags visited like createdAt content';
    Article.findOne({_id: articleId}, fields).then(result => {
        res.send({
            data: result,
            err_code: 0
        });
    }).catch(e => {
        res.send({
            err_code: -2,
            err_msg: e.message
        })
    })
};

// 渲染单篇文章
exports.renderItem = (req, res) => {
    let url = req.params.url;
    let fields = 'title tags visited like createdAt content abstract';
    let data = {url: url, is_delete: 0};
    Article.findOne(data, fields).lean()
        .then(post => {
            post.markdown = marked(post.content);
            res.render('post', {blog: post});
            return post;
        }).then(post => {
            let newVisited = post.visited + 1;
            Article.update({_id: post._id}, {visited: newVisited}).then(res => {
            })
        })
};

// 创建文章
exports.createItem = (req, res) => {
    const body = req.body;
    Article.create(body).then(result => {
        res.send({
            err_code: 0
        });
    }).catch(e => {
        res.send({
            err_code: -2,
            err_msg: e.message
        });
    })
};

// 更新文章
exports.updateItem = (req, res) => {
    let body = req.body,
        id = body.id;

    let data = {
        title: body.title,
        url: body.url,
        abstract: body.abstract,
        content: body.content,
        tags: body.tags
    };
    Article.update({_id: id}, data).then(result => {
        res.send({
            err_code: 0
        });
    }).catch(e => {
        res.send({
            err_code: -2,
            err_msg: e.message
        });
    })
};

// 删除文章
exports.deleteItem = (req, res) => {
    let postId = req.params.id;
    let data = {
        is_delete: 1
    };
    Article.update({_id: postId}, data).then(result => {
        res.send({
            err_code: 0
        });
    }).catch(e => {
        res.send({
            err_code: -2,
            err_msg: e.message
        });
    })
};

// 搜索文章
exports.searchItem = (req, res) => {
    let key = req.body.title;
    let data = {
        is_delete: 0,
        title: new RegExp(key, 'i')
    };
    let feilds = 'title url';
    if (key === '') {
        res.send({
            data: [],
            err_code: 0
        });
        return;
    }
    Article.find(data, feilds).then(data => {
        res.send({
            err_code: 0,
            data: data
        })
    }).catch(e => {
        res.send({
            err_code: -1,
            err_msg: '查询数据库错误'
        });
    })
};