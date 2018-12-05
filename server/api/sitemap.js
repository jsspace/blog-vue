/**
 * Created by minyi on 2018/7/4.
 */
const sm = require('sitemap');
const moment = require('moment');
const fs = require('fs');
const path = require('path');
let Article = require('../models/article.js');
let _ = require('lodash');

function updateSitemap() {
    const sitemap = sm.createSitemap ({
        hostname: 'https://webfem.com',
        cacheTime: 0
    });

    let data = {
        is_delete: 0
    };
    let fields = 'url updatedAt tags';
    Article.find(data, fields).lean()
        .then(posts => {
            posts.forEach(item => {
                item.updatedAt = item.updatedAt || new Date();
                sitemap.add({
                    url: '/post/' + item.url,
                    priority: 0.6,
                    lastmod: moment(item.updatedAt).format('YYYY-MM-DD')
                });
            });
            let tags = [];
            posts.forEach(post => {
                tags = tags.concat(post.tags);
            });
            tags = _.uniq(tags);
            tags.forEach(tag => {
                sitemap.add({
                    url: '/tags/' + tag,
                    priority: 0.5,
                    lastmod: '2018-06-06'
                });
            });

            fs.writeFile(path.resolve('./static/sitemap.xml'), sitemap.toXML(), function (err) {
                if (err) {
                    console.log(err);
                }
            })
        });
}

module.exports = updateSitemap;
