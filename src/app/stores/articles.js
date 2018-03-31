import request from 'utils/request.js'

const config = { HOST: ( typeof window === 'object' ? '' : 'http://127.0.0.1:9527') }

const receivedArticles = (list) => {
    return {
        type: 'receivedArticles',
        list,
        article: {}
    }
}

export const articles = (dispatch) => {
    return request.GET(`${config.HOST}/api/articles`)
        .then((data) => {
            dispatch(receivedArticles(data));
        })
}

const receivedArticle = (article) => {
    return {
        type: 'receivedArticle',
        article
    }
}

export const article = (dispatch, params) => {
    let { id } = params

    return request.GET(`${config.HOST}/api/article/${id}`, {}, { dataType: 'text' })
        .then(data => {
            let article = {
                id, 
                markdown: data
            }
            dispatch(receivedArticle(article))
        })
        .catch(err => {
            console.log(err.message)
        })
}

export const about = (dispatch, params) => {
    params.id = 'about'
    return article(dispatch, params)
}