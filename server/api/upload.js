const request = require('request');

class upload {
    constructor () {
        this.ossUrl = this.getOssUrl();
    }

    getOssUrl () {
        return 'https://barley.mobvoi.com/uploads/image';
    }

    upload (req, res) {
        req.pipe(request({url: this.ossUrl}, (error, response, body) => {
            if (error) {
                console.log(error);
                res.send('aa');
            }
            let finallyUrl = this.parseOssUrl(body);
            res.send(finallyUrl);
        }))
    }

    parseOssUrl (url) {
        return url.replace('http://mobvoi-website.oss.aliyuncs.com', 'https://static-cdn.ticwear.com');
    }
}

module.exports = upload;
