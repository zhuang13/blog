const receivedArticles = (list) => {
    return {
        type: 'receivedArticles',
        list,
        article: {}
    }
}

export const fetchArticles = () => {
    return (dispatch) => {
        fetch('/api/articles')
            .then(resp => resp.json())
            .then(data => {
                dispatch(receivedArticles(data))
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
        fetch(`/api/article/${id}`)
            .then(resp => resp.text())
            .then(data => {
                let article = {
                    id, 
                    markdown: data
                }
                dispatch(receivedArticle(article))
            })
    }
}

export const resetArticle = () => {
    return (dispatch) => dispatch({
        type: 'resetArticle'
    })
}