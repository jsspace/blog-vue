/**
 * Created by minyi on 2018/8/7.
 */
const rp = require('request-promise');
const request = require('request');
const APPSetting = require('../../../secret.json');


module.exports = {
    getToken() {
        let url = `https://api.weixin.qq.com/cgi-bin/token?` +
            `grant_type=client_credential&appid=${APPSetting.appId}&secret=${APPSetting.appSecret}`;
        let options = {
            uri: url,
            method: 'GET',
            json: true
        };
        return rp(options).then(res => {
            if (res.access_token) {
                return res.access_token
            } else {
                throw new Error(res);
            }
        });
    },
    getScanCode(token, articleId) {
        console.log(token);
        let url = `https://api.weixin.qq.com/wxa/getwxacodeunlimit?access_token=${token}`;
        let options = {
            url: url,
            headers: {
                contentType: 'application/json'
            },
            body: JSON.stringify({
                scene: articleId,
                page: 'pages/post/post',
                width: 600,
                auto_color: true
            })
        };
        return request.post(options);
    }
};
