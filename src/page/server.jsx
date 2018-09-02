import React from 'react'
import { createStore } from 'redux'
import reducers from 'app/reducers/index.js'
import * as stores from 'app/stores/index.js'

import Header from 'components/Header/index.jsx'
import Footer from 'components/Footer/index.jsx'
import Css from 'utils/css.jsx'
import cssCode from 'scss/main.scss'

const getApp = routesDOM => () => (
    <div>
        <Css cssCode={cssCode} />
        <Header />
            { routesDOM }
        <Footer />
    </div>
)

const getStore = (initStores) => {
    const store = createStore(reducers)
    let loadDatas = []
    initStores.some((r) => {
        loadDatas.push(stores[r.initStore](store.dispatch, r.params))
    })

    return Promise.all(loadDatas).then(() => store)
}

export {
    getApp,
    getStore
}