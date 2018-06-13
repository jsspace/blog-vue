/**
 * Created by minyi on 2018/5/30.
 */
exports.getLogin = (req, res) => {
    res.render('account/login');
};

exports.postLogin = (req, res) => {
    res.send({
        err_code: 0,
        status: 'ok'
    })
};