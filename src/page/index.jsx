import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import reducers from 'app/reducers/index.js'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import Bundle from 'utils/bundle.jsx'
import 'scss/main.scss'

let store = createStore(
    reducers, 
    applyMiddleware(thunkMiddleware)
)

import loadHeader from 'bundle-loader?lazy&name=header!components/Header/index.jsx'
const Header = (props) => (<Bundle load={loadHeader} loadingComp={(<div></div>)} {...props} />)

import loadArticles from 'bundle-loader?lazy&name=articles!./articles/index.jsx'
const Articles = (props) => (<Bundle load={loadArticles} loadingComp={(<div></div>)} {...props} />)

import loadAbout from 'bundle-loader?lazy&name=about!./about/index.jsx'
const About = (props) => (<Bundle load={loadAbout} loadingComp={(<div></div>)} {...props} />)

import loadArticle from 'bundle-loader?lazy&name=article!./article/index.jsx'
const Article = (props) => (<Bundle load={loadArticle} loadingComp={(<div></div>)} {...props} />)

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <div>
                <Route path="/" component={Header} />
                <Route path="/" exact component={Articles} />
                <Route path="/about" exact component={About} />
                <Route path="/article/:id" exact component={Article} />
            </div>
        </Router>
    </Provider>, 
    document.getElementById("app")
)