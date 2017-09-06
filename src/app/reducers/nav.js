const initialState = {
    current: 'blog'
}

export default (state = initialState, action) => {

    switch (action.type) {
        case 'changeCurrentNav':
            return {current: action.nav}
        default:
            return state
    }
}