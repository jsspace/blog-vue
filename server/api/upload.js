const request = require('request');
const uuid = require('uuid/v1');
const fs = require('fs');
const crypto = require('crypto');


function MD5 (value) {
    return crypto.createHash('md5').update(value).digest('hex');
}

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

    uploadUpai (req, res) {
        const fileName = uuid();
        const url  = `http://v0.api.upyun.com/webfem/webfem/${fileName}`;
        const date = new Date().toGMTString();


        const secret = crypto.createHmac('sha1', MD5('ym930725'))
            .update(`PUT&/webfem/webfem/${fileName}&${date}`, 'utf-8')
            .digest()
            .toString('base64');
        fs.createReadStream(req.file.path).pipe(request({
            url    : url,
            method : 'PUT',
            headers: {
                'Content-Length': req.file.size,
                'Date'          : date,
                'Content-Type'  : req.file.mimetype,
                'Authorization' : 'UPYUN tang:' + secret,
            }
        }, function (err, response) {
            if (err) {
                console.log(err);
                fs.unlink(req.file.path, function (err) {
                    if (err) {
                        console.log(err);
                    }
                })
            }
            fs.unlink(req.file.path, function (err) {
                if (err) {
                    console.log(err);
                }
            });
            res.send(`https://cdn.webfem.com/webfem/${fileName}`);
        }));
    }

    parseOssUrl (url) {
        return url.replace('http://mobvoi-website.oss.aliyuncs.com', 'https://static-cdn.ticwear.com');
    }
}

module.exports = upload;
