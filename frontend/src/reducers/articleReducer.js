import {
    CREATE_ARTICLE,
    GET_ALL_ARTICLES,
    UPDATE_ARTICLE,
    DELETE_ARTICLE,
    SEARCH_ARTICLES
} from "../constants/adminConstants";

const initialState = {
    article: {}
};

// return Object.assign({}, state, {
//     user: Object.assign({}, state.user, {
//         avatar: action.payload.avatar
//     }),
//     success: action.payload.success,
//     message: action.payload.message
// })

function articleReducer(state = initialState, action) {
    switch (action.type) {
        case CREATE_ARTICLE:
            return Object.assign({}, state, {
                articles: state.articles.concat(action.payload.article),
                success: action.payload.success,
                message: action.payload.message
            })
        case UPDATE_ARTICLE:
            return Object.assign({}, state, {
                success: action.payload.success,
                message: action.payload.message,
                articles: state.articles.map(article => {
                    if (article._id === action.payload.article._id) {
                        article = action.payload.article
                        return article
                    }
                    return article
                })
            })
        case DELETE_ARTICLE:
            return Object.assign({}, state, {
                article: action.payload.article,
                success: action.payload.success,
                message: action.payload.message,
                articles: state.articles.filter(article => article._id !== action.payload.article._id)
            })
        case GET_ALL_ARTICLES:
            return Object.assign({}, state, {
                articles: action.payload.articles
            })
        case SEARCH_ARTICLES:
            return Object.assign({}, state, {
                success: action.payload.success,
                searchArticles: action.payload.articles
            })
        default:
            return state;
    }

};

export default articleReducer;