import request from 'utils/request.js'
import * as actions from 'app/actions/index.js'
import config from 'config'

const initStore = {}

initStore.articles = () => {
    return request.GET(`${config.host}/api/articles`).then((data) => {
        let store = {
            nav: {
                current: 'blog'
            },
            articles: {
                list: data,
                article: {}
            }
        }
        return Promise.resolve(store)
    })
}

initStore.about = () => {
    return request.GET(`${config.host}/api/article/about`, {}, { dataType: 'text' }).then((data) => {
        let store = {
            nav: {
                current: 'about'
            },
            articles: {
                list: null,
                article: {
                    id: 'about', 
                    markdown: data
                }
            }
        }
        return Promise.resolve(store)
    })
}

initStore.article = (params) => {
    let id = params.id
    return request.GET(`${config.host}/api/article/${id}`, {}, { dataType: 'text' }).then((data) => {
        let store = {
            nav: {
                current: 'blog'
            },
            articles: {
                list: null,
                article: {
                    id, 
                    markdown: data
                }
            }
        }
        return Promise.resolve(store)
    })
}

export default initStore