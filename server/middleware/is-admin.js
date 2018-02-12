/**
 * Created by minyi on 2017/11/28.
 */
const path = require('path');
exports.isAdmin = (req, res, next) => {
    if (req.user) return next();
    res.send({
        err_code: -1,
        err_msg: '未登录'
    });
};

exports.needLogin = (req, res, next) => {
    if (req.user) return next();
    res.sendFile(path.resolve(__dirname, '../../static/login.html'));
};