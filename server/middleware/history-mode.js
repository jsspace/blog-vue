/**
 * Created by minyi on 2017/11/28.
 */
const path = require('path');
exports.historyMode = (req, res, next) => {
    console.log('aa');
    res.sendFile(path.resolve('dist/admin/index.html'));
};