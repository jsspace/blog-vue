/**
 * Created by minyi on 2018/2/12.
 */
const express = require('express');
const router = express.Router();

// catch 404 and forward to error handler
router.use((req, res, next) => {
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
router.use((err, req, res, next) => {
    res.status(err.status || 500);
    if (err.status === 404 || err.message === '404') {
        res.render('404', {page: 404});
        return;
    }
    if (process.env.NODE_ENV === 'development') {
        res.send({
            message: err.message,
            error: err
        });
        return;
    }
    res.render('500', {page: 500});
});


module.exports = router;
