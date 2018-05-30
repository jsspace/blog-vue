/**
 * Created by minyi on 2018/3/21.
 */
let User = require('../models/user');

exports.createUser = (req, res) => {
    let body = req.body;
    User.create(body).then(result => {
        res.send({
            err_code: 0
        });
    }).catch(e => {
        console.log(e);
        res.send({
            err_code: -2,
            err_msg: e.message
        });
    })
};