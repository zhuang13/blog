import request from 'utils/request.js'
import { articles, article } from 'app/stores/articles.js'

export const fetchArticles = () => {
    return articles;
}

export const fetchArticle = (id) => {
    return (dispatch) => { article(dispatch, {id}) };
}

export const resetArticle = () => {
    return (dispatch) => dispatch({
        type: 'resetArticle'
    })
}