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

var db = mongoose.connect('mongodb://localhost/blog').then(() => {
    console.log('--数据库连接成功--');
}).catch(err => {
    console.log('数据库连接失败：' + err);
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


app.use((err, req, res, next) => {
    if (err.status === 404 || err === 404) {
        res.statusCode = 404;
        res.render('404', {page: 404});
        return;
    }
    res.statusCode = 500;
    if (process.env.NODE_ENV === 'development') {
        res.send({
            message: err.message,
            error: err
        });
        return;
    }
    res.send({
        message: err.message,
    });
});

module.exports = app;




