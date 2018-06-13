/**
 * Created by minyi on 2017/11/28.
 */
const path = require('path');
exports.historyMode = (req, res, next) => {
    if (req.user) {
        res.sendFile(path.resolve('dist/admin/index.html'));
    } else {
        res.redirect('/login');
    }
};