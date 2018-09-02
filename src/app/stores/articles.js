import request from 'utils/request.js'

const config = { 
    HOST: ( typeof window === 'object' ? '' : 'http://127.0.0.1:9527'),
}

const receivedArticles = (list) => {
    return {
        type: 'receivedArticles',
        list,
        article: {}
    }
}

export const articles = (dispatch) => {
    let p1 = request.GET(`${config.HOST}/v1/data/1`);
    let p2 = request.GET(`${config.HOST}/v1/data/5`);

    return Promise.all([p1, p2])
        .then(([resp1, resp2]) => {
            let articles = resp1.data;
            let tags = resp2.data;
            articles.forEach((item) => {
                let tag_ids = JSON.parse(item.tag_ids) || [];
                item.tags = tags.filter((t) => tag_ids.indexOf(t.id) !== -1);
            });
            dispatch(receivedArticles(articles));
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