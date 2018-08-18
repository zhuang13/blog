import request from 'superagent'

export default (req, resp, options) => {
    var opt = {
        url: options.host + options.url,
        headers: req.headers,
        method: req.method,
    };

    new Promise((resolve, reject) => {
        if (opt.method === 'GET') {
            let body = []
            req.on('data', function(chunk) {
                body.push(chunk);
            }).on('end', function() {
                body = Buffer.concat(body).toString()
                opt.body = body || '';
                resolve();
            });
        } else {
            resolve();
        }
    }).then(() => {
        opt.headers.host = options.host.slice(options.host.indexOf('://')+3).replace(/\/$/,'');
        return request(opt.method, opt.url).set(opt.headers).send(opt.body).buffer();
    }).then((res) => {
        resp.statusCode = res.status;
        let headers = res.headers._headers;
        for (var name in headers) {
            resp.setHeader(name, headers[name]);
        }
        resp.write(res.text || res.body);
        resp.end()
    }).catch(err => {
        let res = err.response || {};
        resp.statusCode = res.status;
        resp.write(`${res.status} ${err.message}`);
        resp.end();
    });
    
}
