import axios from 'axios';
import {
    REGISTER,
    LOGIN_ADMIN,
    LOGOUT_ADMIN,
    AVATAR_CHANGE,
    EDIT_PROFILE,
    GET_USER_DETAILS,
    CREATE_PLACE,
    EDIT_PLACE,
    DELETE_PLACE,
    GET_ALL_PLACES,
    GET_ALL_USERS,
    GET_ALL_RESERVATIONS,
    EDIT_PROFILE_ADMIN,
    DELETE_USER_ADMIN,
    UPDATE_RESERVATION_STATUS,
    DELETE_RESERVATION,
    FORGOT_PASSWORD,
    RESET_PASSWORD
} from '../constants/adminConstants';
let baseURL = '';

//REGISTER
export const register = (registerData) => async (dispatch) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const { data } = await axios.post(`/api/v1/register`, registerData, config)
        dispatch({
            type: REGISTER,
            payload: data
        })
        return data
    } catch (err) {
        
        return { message: 'An error has occured' }
    }

};

//GET USER DETAILS
export const getUserDetails = () => async (dispatch) => {

    try {
        const { data } = await axios.get(`/api/v1/getUserDetails`)
        dispatch({
            type: GET_USER_DETAILS,
            payload: data
        })
        return data
    } catch (err) {
        
        return { message: 'An error has occured' }
    }

};

//LOGIN
export const loginAdmin = (loginData) => async (dispatch) => {

    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const { data } = await axios.post(`/api/v1/login`, loginData, config)
        dispatch({
            type: LOGIN_ADMIN,
            payload: data
        })
        return data
    } catch (err) {
        
        return { message: 'An error has occured' }
    }

};
//LOGOUT 
export const logoutAdmin = async (dispatch) => {
    await axios.get(`/api/v1/logout`)
    dispatch({
        type: LOGOUT_ADMIN,
        payload: []
    })
};

export const avatarChange = (id, userObj) => async (dispatch) => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    try {
        const { data } = await axios.post(`/api/v1/avatar/change/${id}`, userObj, config)
        dispatch({
            type: AVATAR_CHANGE,
            payload: data
        })
        return data
    } catch (err) {
        return { message: 'An error has occured' }
    }


};

//Forgot password
export const forgotPassword = (forgotPasswordData) => async (dispatch) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json' 
            }
        }
        const { data } = await axios.post(`/api/v1/password/forgot`,  forgotPasswordData,config)
        dispatch({
            type: FORGOT_PASSWORD,
            payload: data
        })
        return data
    } catch (err) {
        
        return { message: 'An error has occured', success: false }
    }
}


//Reset password
export const resetPassword = (token, resetPasswordsData) => async (dispatch) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json' 
            }
        }
        const { data } = await axios.put(`/api/v1/password/reset/${token}`,  resetPasswordsData,config)
        dispatch({
            type: RESET_PASSWORD,
            payload: data
        })
        return data
    } catch (err) {
        
        return { message: 'An error has occured', success: false }
    }
}








//Edit Profile Details
export const editUserDetails = (id, userData) => async (dispatch) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const { data } = await axios.put(`/api/v1/me/update/${id}`, userData, config)
        dispatch({
            type: EDIT_PROFILE,
            payload: data
        })
        return data
    } catch (err) {
        
        return { message: 'An error has occured' }
    }

};




//Edit Profile Details FOR ADMIN ONLY
export const editUserDetailsAdmin = (id, userData) => async (dispatch) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const { data } = await axios.put(`/api/v1/admin/user/update/${id}`, userData, config)
        dispatch({
            type: EDIT_PROFILE_ADMIN,
            payload: data
        })
        return data
    } catch (err) {
        
        return { message: 'An error has occured' }
    }

};



//Delete User FOR ADMIN ONLY
export const deleteUserAdmin = (id) => async (dispatch) => {
    try {
        const { data } = await axios.delete(`/api/v1/admin/user/delete/${id}`)
        dispatch({
            type: DELETE_USER_ADMIN,
            payload: data
        })
        return data
    } catch (err) {
        
        return { message: 'An error has occured' }
    }

};



//Create a place ADMIN ONLY
export const createPlace = (placeData) => async (dispatch) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const { data } = await axios.post(`/api/v1/admin/places/create`, placeData, config)
        dispatch({
            type: CREATE_PLACE,
            payload: data
        })
        return data
    } catch (err) {
        
        return { message: 'An error has occured' }
    }

};

//EDIT PLACE
export const editPlace = (id,placeData) => async (dispatch) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const { data } = await axios.put(`/api/v1/admin/places/update/${id}`, placeData, config)
        dispatch({
            type: EDIT_PLACE,
            payload: data
        })
        return data
    } catch (err) {
        
        return { message: 'An error has occured' }
    }

};


//Delete place
export const deletePlace = (id) => async (dispatch) => {
    try {
        const { data } = await axios.delete(`/api/v1/admin/places/delete/${id}`)
        dispatch({
            type: DELETE_PLACE,
            payload: data
        })
        return data
    } catch (err) {
        
        return { message: 'An error has occured' }
    }

};

// ,
//   "proxy": "http://127.0.0.1:4000"

//Get all places
export const getAllPlaces = () => async (dispatch) => {
    try {
        const { data } = await axios.get(`/api/v1/getAllPlaces`)
        dispatch({
            type: GET_ALL_PLACES,
            payload: data
        })
        return data
    } catch (err) {
        
        return { message: 'An error has occured' }
    }

};


//Get all users
export const getAllUsers = () => async (dispatch) => {
    try {
        const { data } = await axios.get(`/api/v1/admin/users/all`)
        dispatch({
            type: GET_ALL_USERS,
            payload: data
        })
        return data
    } catch (err) {
        
        return { message: 'An error has occured' }
    }

};


//GET ALL RESERVATIONS FOR ADMIN ONLY => /admin/reservations/all
export const getAllReservations = () => async (dispatch) => {
    try {
        const { data } = await axios.get(`/api/v1/admin/reservations/all`)
        dispatch({
            type: GET_ALL_RESERVATIONS,
            payload: data
        })
        return data
    } catch (err) {
        
        return { message: 'An error has occured' }
    }

};

// 


//updateReservationStatus FOR ADMIN ONLY
export const updateReservationStatus = (id,statusData) => async (dispatch) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const { data } = await axios.put(`/api/v1/admin/reservation/update/${id}`, statusData, config)
        dispatch({
            type: UPDATE_RESERVATION_STATUS,
            payload: data
        })
        return data
    } catch (err) {
        
        return { message: 'An error has occured' }
    }

};


//delete Reservation FOR ADMIN ONLY
export const deleteReservation = (id) => async (dispatch) => {
    try {
        const { data } = await axios.delete(`/api/v1/admin/reservation/delete/${id}`)
        dispatch({
            type: DELETE_RESERVATION,
            payload: data
        })
        return data
    } catch (err) {
        
        return { message: 'An error has occured' }
    }

};