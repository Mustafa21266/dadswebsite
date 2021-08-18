import {
    CREATE_PLACE,
    EDIT_PLACE,
    DELETE_PLACE,
    GET_ALL_PLACES
} from "../constants/adminConstants";

const initialState = {
    places: []
};

// return Object.assign({}, state, {
//     user: Object.assign({}, state.user, {
//         avatar: action.payload.avatar
//     }),
//     success: action.payload.success,
//     message: action.payload.message
// })

function placeReducer(state = initialState, action) {
    switch (action.type) {
        case CREATE_PLACE:
            return Object.assign({}, state, {
                places: state.places.concat(action.payload.place),
                success: action.payload.success,
                message: action.payload.message
            })
        case EDIT_PLACE:
            return Object.assign({}, state, {
                places: state.places.map(place => {
                    if (place._id === action.payload.place._id) {
                        place = action.payload.place
                        return place
                    }
                    return place
                }),
                success: action.payload.success,
                message: action.payload.message
            })
        case DELETE_PLACE:
            return Object.assign({}, state, {
                places: state.places.filter(place => place._id !== action.payload.place._id),
                success: action.payload.success,
                message: action.payload.message
            })
        case GET_ALL_PLACES:
            return Object.assign({}, state, {
                places: action.payload.places,
                success: action.payload.success
            })
        default:
            return state;
    }

};

export default placeReducer;