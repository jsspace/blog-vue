/**
 * Created by minyi on 2017/11/28.
 */
const express = require('express');
const config = require('./server/config');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const favicon = require('serve-favicon');
const logger = require('morgan');
const passport = require('passport');
const session = require('express-session');
const compression = require('compression');
var mongoose = require('mongoose');

var db = mongoose.connect('mongodb://localhost/personalBlog');
db.connection.on('error', function (error) {
    console.log('数据库连接失败：' + error);
});
db.connection.once('open', function () {
    console.log('--数据库连接成功--');
});

// routes
let router = require('./server/routes');

// create app
const app = express();

// app setting
app.set('views', path.resolve(__dirname, './server/views'));
app.set('view engine', 'ejs');

// app add middleware
app.use(compression());
app.use(logger('dev'));
app.use(favicon(path.join(__dirname, 'static', '/img/favicon.ico')));
app.use(express.static(path.resolve(__dirname, 'static')));
app.use(express.static(path.resolve(__dirname, 'dist')));
app.use(express.static('../blog-images'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(session({secret: 'fsdafqwexcwe2135gfds', resave: false, saveUninitialized: false}));
app.use(passport.initialize());
app.use(passport.session());


// handle routes
app.use(router);

module.exports = app;




