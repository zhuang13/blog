const receivedArticles = (list) => {
    return {
        type: 'receivedArticles',
        list
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
                dispatch(receivedArticle(data))
            })
    }
}