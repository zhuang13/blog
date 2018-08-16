import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route, Link, matchPath } from 'react-router-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import routes from 'app/configs/routes.js'
import reducers from 'app/reducers/index.js'

import Bundle from 'utils/bundle.jsx'
import Loading from 'components/Loading/index.jsx'
import Header from 'components/Header/index.jsx'
import Footer from 'components/Footer/index.jsx'
import Css from 'utils/css.jsx'
import cssCode from 'scss/main.scss'

// 声明延迟加载的组件
let loads = {}, comps = {}

loads.Articles = require('bundle-loader?lazy&name=articles!./articles/index.jsx')
comps.Articles = (props) => (<Bundle load={loads.Articles} loadingComp={(<Loading />)} {...props} />)

loads.About = require('bundle-loader?lazy&name=about!./about/index.jsx')
comps.About = (props) => (<Bundle load={loads.About} loadingComp={(<Loading />)} {...props} />)

loads.Article = require('bundle-loader?lazy&name=article!./article/index.jsx')
comps.Article = (props) => (<Bundle load={loads.Article} loadingComp={(<Loading />)} {...props} />)

// 根据server端传递的state初始化store
const preloadedState = window.__PRELOADED_STATE__
delete window.__PRELOADED_STATE__

let store = createStore(
    reducers, 
    preloadedState,
    applyMiddleware(thunkMiddleware)
)

// 首屏组件加载成功后，再render
let loadNum = 0, loadSum = 0

const isLoadComplete = (key, comp) => {
    loadNum++
    comps[key] = comp.default

    if (loadNum == loadSum) {
        ReactDOM.render(
            <Provider store={store}>
                <Router>
                    <div>
                        <Css cssCode={cssCode} />
                        <Header />
                        {
                            routes.map(r => {
                                return <Route key={r.name} {...r} component={comps[r.name]} />
                            })
                        }
                        <Footer />
                    </div>
                </Router>
            </Provider>, 
            document.getElementById("app")
        )
    }
}

routes.some((r) => {
    if (matchPath(location.pathname, r)) {
        loadSum++
        loads[r.name](isLoadComplete.bind(this, r.name))
    }
})