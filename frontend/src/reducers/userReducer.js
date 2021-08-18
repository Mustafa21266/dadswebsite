import {
  REGISTER,
  LOGIN_ADMIN,
  LOGOUT_ADMIN,
  AVATAR_CHANGE,
  EDIT_PROFILE,
  GET_USER_DETAILS,
  GET_ALL_USERS,
  GET_ALL_RESERVATIONS,
  EDIT_PROFILE_ADMIN,
  DELETE_USER_ADMIN,
  UPDATE_RESERVATION_STATUS,
  DELETE_RESERVATION,
  FORGOT_PASSWORD,
  RESET_PASSWORD
} from "../constants/adminConstants";

const initialState = {
  user: {},
  users: [],
  reservations: []
};

function userReducer(state = initialState, action) {
  switch (action.type) {
    case REGISTER:
      
      return Object.assign({}, state, {
        user: action.payload.user,
        users: state.users.concat(action.payload.user)
      })
    case EDIT_PROFILE:
      
      return Object.assign({}, state, {
        success: action.payload.success,
        message: action.payload.message,
        user: action.payload.user
      })
    case LOGIN_ADMIN:
      
      return Object.assign({}, state, {
        user: action.payload.user
      })
    case GET_USER_DETAILS:
      
      return Object.assign({}, state, {
        user: action.payload.user
      })
    case LOGOUT_ADMIN:
      
      return Object.assign({}, state, {
        user: []
      })
    case FORGOT_PASSWORD:
      return Object.assign({}, state, {
        message: action.payload.message,
        success: action.payload.success
      });
    case RESET_PASSWORD:
      return Object.assign({}, state, {
        success: action.payload,
        loading: false
      });
    case AVATAR_CHANGE:
      return Object.assign({}, state, {
        user: Object.assign({}, state.user, {
          avatar: action.payload.avatar
        }),
        success: action.payload.success,
        message: action.payload.message
      })
    case GET_ALL_USERS:
      return Object.assign({}, state, {
        users: action.payload.users,
        success: action.payload.success
      })
    case GET_ALL_RESERVATIONS:
      return Object.assign({}, state, {
        reservations: action.payload.reservations,
        success: action.payload.success
      })
    case EDIT_PROFILE_ADMIN:
      
      return Object.assign({}, state, {
        success: action.payload.success,
        message: action.payload.message,
        users: state.users.map(user => {
          if (user._id === action.payload.user._id) {
            user = action.payload.user
            return user
          }
          return user
        })
      })
    case DELETE_USER_ADMIN:
      
      return Object.assign({}, state, {
        success: action.payload.success,
        message: action.payload.message,
        users: state.users.filter(user => user._id !== action.payload.user._id)
      })
    case UPDATE_RESERVATION_STATUS:
      return Object.assign({}, state, {
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
    case DELETE_RESERVATION:
      return Object.assign({}, state, {
        reservations: state.reservations.filter(res => res._id !== action.payload.reservation._id),
        message: action.payload.message,
        success: action.payload.success
      })
    default:
      return state;
  }

};

export default userReducer;