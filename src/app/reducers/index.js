import { combineReducers } from 'redux'
import nav from './nav.js'
import articles from './articles.js'

const reducers = combineReducers({
    nav,
    articles
})

export default reducers