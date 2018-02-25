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
if (process.env.NODE_ENV === 'development') {
    router.use((err, req, res, next) => {
        res.status(err.status || 500);
        res.send({
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
router.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.send({
        message: err.message,
    });
});


module.exports = router;
