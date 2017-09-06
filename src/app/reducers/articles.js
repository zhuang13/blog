const initialState = {
    list: null,
    article: null
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
        default:
            return state
    }
}