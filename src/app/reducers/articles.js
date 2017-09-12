const initialState = {
    list: null,
    article: {}
}

export default (state = initialState, action) => {

    switch (action.type) {
        case 'receivedArticles':
            return Object.assign({}, state, { 
                list: action.list
            })
        case 'receivedArticle':
            return Object.assign({}, state, { 
                article: action.article 
            })
        case 'resetArticle':
            return Object.assign({}, state, {
                article: {}
            })
        default:
            return state
    }
}