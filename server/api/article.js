/**
 * Created by minyi on 2017/6/1.
 */
let Article = require('../models/article.js');

exports.getList = (req, res) => {
    let by = req.query.by,
        key = req.query.key,
        limit = req.query.limit,
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
            totalPage: totalPage,
            hasMore: hasMore,
            err_code: 0
        });
    });
};

// 获取单篇文章
exports.getItem = (req, res) => {
    const articleId = req.param.id;
    if (!articleId) {
        res.send({
            err_code: -1,
            err_msg: 'no id'
        });
        return;
    }
    let fields = 'title url abstract tags visited like createdAt';
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
    const body = req.body;
    Article.update()
}