import request from 'utils/request.js'

const receivedArticles = (list) => {
    return {
        type: 'receivedArticles',
        list,
        article: {}
    }
}

export const fetchArticles = () => {
    return (dispatch) => {
        request.GET('/api/articles')
            .then(data => {
                dispatch(receivedArticles(data))
            })
            .catch(err => {
                console.log(err.message)
            })
    }
}

const receivedArticle = (article) => {
    return {
        type: 'receivedArticle',
        article
    }
}

export const fetchArticle = (id) => {
    return (dispatch) => {
        request.GET(`/api/article/${id}`, {}, { dataType: 'text' })
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
}

export const resetArticle = () => {
    return (dispatch) => dispatch({
        type: 'resetArticle'
    })
}