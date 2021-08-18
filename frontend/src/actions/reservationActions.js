import axios from 'axios';
import { 
    CREATE_RESERVATION,
    GET_USER_RESERVATIONS,
    CANCEL_RESERVATION
} from '../constants/reservationConstants';


export const createReservation = (reservationData) => async (dispatch) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const { data } = await axios.post(`/api/v1/reservations/create`, reservationData, config)
        dispatch({
            type: CREATE_RESERVATION,
            payload: data
        })
        return data
    } catch (err) {
        
        return { message: 'An error has occured' }
    }

};

export const getAllUserReservations = () => async (dispatch) => {
    try {
        const { data } = await axios.get(`/api/v1/reservations/me/all`)
        dispatch({
            type: GET_USER_RESERVATIONS,
            payload: data
        })
        return data
    } catch (err) {
        
        return { message: 'An error has occured' }
    }

};


export const cancelReservation = (id) => async (dispatch) => {
    try {
        const { data } = await axios.put(`/api/v1/me/reservation/cancel/${id}`)
        dispatch({
            type: CANCEL_RESERVATION,
            payload: data
        })
        return data
    } catch (err) {
        
        return { message: 'An error has occured' }
    }

};