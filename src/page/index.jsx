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

import Loading from 'components/Loading/index.jsx'

import loadHeader from 'bundle-loader?lazy&name=header!components/Header/index.jsx'
const Header = (props) => (<Bundle load={loadHeader} loadingComp={(<Loading />)} {...props} />)

import Footer from 'components/Footer/index.jsx'

import loadArticles from 'bundle-loader?lazy&name=articles!./articles/index.jsx'
const Articles = (props) => (<Bundle load={loadArticles} loadingComp={(<Loading />)} {...props} />)

import loadAbout from 'bundle-loader?lazy&name=about!./about/index.jsx'
const About = (props) => (<Bundle load={loadAbout} loadingComp={(<Loading />)} {...props} />)

import loadArticle from 'bundle-loader?lazy&name=article!./article/index.jsx'
const Article = (props) => (<Bundle load={loadArticle} loadingComp={(<Loading />)} {...props} />)

// 根部font-size自适应，整体rem自适应
let change = () => {
    document.documentElement.style.fontSize = Math.min(22, 14 * document.documentElement.clientWidth / 320)  +'px';
}
change();
window.addEventListener('resize', function(){
    change();
}, false);

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <div>
                <Route path="/" component={Header} />
                <Route path="/" exact component={Articles} />
                <Route path="/about" exact component={About} />
                <Route path="/article/:id" exact component={Article} />
                <Footer />
            </div>
        </Router>
    </Provider>, 
    document.getElementById("app")
)