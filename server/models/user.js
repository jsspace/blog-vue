/**
 * Created by minyi on 2018/1/18.
 */
const mongoose = require('mongoose');
const Promise = require('bluebird');

// connect mongodb
const UserSchema = mongoose.Schema({
    username: String,
    password: String,
    meta: {
        createAt: {
            type: Date,
            default: Date.now()
        },
        lastLogin: {
            type: Date,
            default: Date.now()
        }
    }
});

UserSchema.pre('save', function (next) {
    if (this.isNew) {
        this.meta.createAt = Date.now();
    }
    next();
});


UserSchema.statics = {
    fetch: function (cb) {
        return this.find({}).sort({'meta.createAt': 1}).exec(cb);
    },
    findById: function (id, cb) {
        return this
            .findOne({_id: id}).exec(cb);
    },
    findByUsername: function (username, cb) {
        return this
            .findOne({username: username}).exec(cb);
    },
    createInfo: function (user, cb) {
        return this.create(user, cb);
    },
    updateInfo: function (id, user, cb) {
        var conditions = {_id: id},
            options = {},
            update = {$set: user};
        return this.update(conditions, update, options, cb);
    }
};

let User = mongoose.model('user', UserSchema);
Promise.promisifyAll(User);
Promise.promisifyAll(User.prototype);

module.exports = User;