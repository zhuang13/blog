import React from 'react'
import { Route, matchPath } from 'react-router-dom'
import { createStore } from 'redux'
import routes from 'app/configs/routes.js'
import reducers from 'app/reducers/index.js'
import initStore from 'node/initStore'

import Header from 'components/Header/index.jsx'
import Footer from 'components/Footer/index.jsx'
import Css from 'utils/css.jsx'
import cssCode from 'scss/main.scss'

const getApp = url => () => (
    <div>
        <Css cssCode={cssCode} />
        <Header />
        {
            routes.map(r => {
                const match = matchPath(url, r)
                let component;
                match && (component = require(r.src).default)
                return <Route key={r.src} {...r} component={component} />
            })
        }
        <Footer />
    </div>
)

const getStore = (url) => {
    let loadDatas = []
    routes.some((r) => {
        const match = matchPath(url, r)
        if (match && r.initStore) {
            let p = initStore[r.initStore]
            loadDatas.push(p(match.params))
        }
    })

    return Promise.all(loadDatas).then((datas) => {
        let data = {};
        datas.some((d) => {
            data = Object.assign(data, d)
        })
        const store = createStore(reducers, data)
        return store
    })

}

export {
    getApp,
    getStore
}