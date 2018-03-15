/**
 * Created by minyi on 2017/11/28.
 */
const express = require('express');
const router = express.Router();
const isAdmin = require('../middleware/is-admin').isAdmin;
const needLogin = require('../middleware/is-admin').needLogin;
const historyMode = require('../middleware/history-mode').historyMode;
const article = require('../api/article');
const api = require('../api');
const error = require('./error');

// === frontend ===
router.get('/', article.renderIndex);
router.get('/post/:url', article.renderItem);


// ==== admin ====
router.get('/space/admin', historyMode);
router.get('/space/admin/*', historyMode);

// ==== api ====
router.get('/posts', article.getList);

router.post('/posts', article.createItem);

router.put('/posts/modify', article.updateItem);
router.get('/posts/item', article.getItem);
router.delete('/posts/item/:id', article.deleteItem);


router.use(error);

module.exports = router;