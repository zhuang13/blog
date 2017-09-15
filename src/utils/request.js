import 'whatwg-fetch'

const defaultOptions = {
    dataType: 'json'
}

const request = (url, data, method, options) => {
    options = Object.assign({}, defaultOptions, options)
    return fetch(url, {
            method,
            body: data
        })
        .then(resp => {
            if (resp.status >= 200 && resp.status < 300) {
                switch(options.dataType) {
                    case 'text': return resp.text()
                    case 'json': return resp.json()
                    default: 
                        console.error('unknow datatype')
                        throw new Exception('出错了, 请稍后再重试 -_#')
                }
            } else {
                throw new Error('出错了, 请稍后再重试 -_#')
            }
        })
}

const GET = (url, data, options) => {
    return request(url, data, 'GET', options)
}

const POST = (url, data, options) => {
    return request(url, data, 'POST', options)
}

export default {
    GET
}