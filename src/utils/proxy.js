import 'isomorphic-fetch'

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
                console.log(opt.body);
                resolve();
            });
        } else {
            resolve();
        }
    }).then(() => {
        opt.headers.host = options.host.slice(options.host.indexOf('://')+3).replace(/\/$/,'');

        return fetch(opt.url, {
            method: opt.method,
            body: opt.body,
            headers: opt.headers 
        })
    }).then((res) => {
        resp.statusCode = res.status;
        if (res.status >= 200 && res.status < 300) {
            let headers = res.headers._headers;
            for (var name in headers) {
                resp.setHeader(name, headers[name]);
            }
            res.text().then((result) => {
                resp.write(result)
                resp.end()
            })
        } else {
            resp.write(`${res.status} ${res.statusText}`)
            resp.end()
        }
    })
    
}
