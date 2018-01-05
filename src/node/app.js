import React from 'react';
import ReactDOMServer from 'react-dom/server'
import { StaticRouter } from 'react-router'
import { Provider } from 'react-redux'
import app from 'http'
import fs from 'fs'
import path from 'path'
import config from 'config'

import { getApp, getStore } from '../page/server.jsx'

let bundleName = 'index.js';

const server = (req, resp) => {
    if (/\/(api|public)\//.test(req.url)) {
        let result = fs.readFileSync(path.join(__dirname,'..'+req.url));
        resp.write(result);
        resp.end();
        return; 
    }

    let App = getApp(req.url)

    getStore(req.url).then((store) => {
        const context = {}
        const markup = ReactDOMServer.renderToString(
            <Provider store={store}>
                <StaticRouter
                    location={req.url}
                    context={context}
                >
                    <App />
                </StaticRouter>
            </Provider>
        )
        
        const preloadedState = store.getState();
        if (context.url) {
          redirect(301, context.url)
        } else {
            resp.write(`<html><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"><meta name="format-detection" content="telephone=no" /><title>zhuang\'s blog</title><style>${global.scss}</style></head><body><div id="app">${markup}</div><script>window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState)};</script><script type="text/javascript" src="${config.CDN}/${bundleName}"></script></body></html>`);
            resp.end();
        }
    });
}

export default (bname) => {
    bundleName = bname || bundleName;
    app.createServer(server).listen(config.PORT);
}