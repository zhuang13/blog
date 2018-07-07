import React from 'react';
import ReactDOMServer from 'react-dom/server'
import { StaticRouter } from 'react-router'
import { Route, matchPath } from 'react-router-dom'
import { Provider } from 'react-redux'
import app from 'http'
import fs from 'fs'
import path from 'path'
import config from 'config'

import routes from 'app/configs/routes.js'
import proxy from 'utils/proxy.js'
import { getApp, getStore } from '../page/server.jsx'

let bundleName = 'index.js';

const server = (req, resp) => {
    if (/\/(api|public)\//.test(req.url)) {
        let result = fs.readFileSync(path.join(__dirname,'..'+req.url));
        resp.write(result);
        resp.end();
        return; 
    }

    if (/\/v1\//.test(req.url)) {
        proxy(req, resp, {
            url: req.url,
            host: 'http://api.zhuang13.me'
        })
        return;
    }

    let initStores = []

    const routesDOM = routes.map(r => {
        const match = matchPath(req.url, r)
        let component;
        if (match) {
            component = require(r.src).default 
            initStores.push({initStore: r.initStore, params: match.params})
        }
        return <Route key={r.src} {...r} component={component} />
    })

    let App = getApp(routesDOM)

    getStore(initStores).then((store) => {
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
            resp.write(`
                <html>
                    <head>
                        <meta charset="UTF-8">
                        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
                        <meta name="format-detection" content="telephone=no" />
                        <title>zhuang\'s blog</title>
                        <style>${global.scss}</style>
                    </head>
                    <body>
                        <div id="app">${markup}</div>
                        <script>window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState)};</script>
                        <script type="text/javascript" src="${config.CDN}/${bundleName}"></script>
                    </body>
                </html>
            `);
            resp.end();
        }
    });
}

export default (bname) => {
    bundleName = bname || bundleName;
    app.createServer(server).listen(config.PORT);
}