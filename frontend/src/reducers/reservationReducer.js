import {
    CREATE_RESERVATION,
    GET_USER_RESERVATIONS,
    CANCEL_RESERVATION
} from '../constants/reservationConstants';

const initialState = {
    reservations: [],
    currentUserReservations: []
};

function reservationReducer(state = initialState, action) {
    switch (action.type) {
        case CREATE_RESERVATION:
            return Object.assign({}, state, {
                currentUserReservations: state.reservations.concat(action.payload.reservation),
                success: action.payload.success,
                message: action.payload.message
            })
        case GET_USER_RESERVATIONS:
            return Object.assign({}, state, {
                currentUserReservations: action.payload.reservations,
                success: action.payload.success
            })
        case CANCEL_RESERVATION:
            return Object.assign({}, state, {
                currentUserReservations: state.reservations.map(res => {
                    if (res._id === action.payload.reservation._id) {
                        res = action.payload.reservation
                        return res
                    }
                    return res
                }),
                reservations: state.reservations.map(res => {
                    if (res._id === action.payload.reservation._id) {
                        res = action.payload.reservation
                        return res
                    }
                    return res
                }),
                message: action.payload.message,
                success: action.payload.success
            })
        default:
            return state;
    }

};

export default reservationReducer;