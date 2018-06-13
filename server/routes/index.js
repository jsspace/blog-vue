/**
 * Created by minyi on 2017/11/28.
 */
const express = require('express');
const router = express.Router();
const isAdmin = require('../middleware/is-admin').isAdmin;
const needLogin = require('../middleware/is-admin').needLogin;
const historyMode = require('../middleware/history-mode').historyMode;
const article = require('../api/article');
const user = require('../api/user');
const api = require('../api');
const error = require('./error');
const passport = require('../passport/passport.js');
const account = require('../api/account');

// === frontend ===
router.get('/', article.renderIndex);
router.get('/post/:url', article.renderItem);
router.get('/tags/:tag', api.tags.getTagItem);

// === account ===
router.get('/login', account.getLogin);
router.post('/login', passport, account.postLogin);

// ==== admin ====
router.get('/space/admin', historyMode);
router.get('/space/admin/*', historyMode);

// ==== api ====
router.get('/posts', article.getList);
router.post('/posts', article.createItem);
router.put('/posts/modify', article.updateItem);
router.get('/posts/item', article.getItem);
router.delete('/posts/item/:id', article.deleteItem);

router.post('/user', user.createUser);


router.use(error);

module.exports = router;