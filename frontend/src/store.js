import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from "./reducers/rootReducer";
import userReducer from './reducers/userReducer';
import articleReducer from './reducers/articleReducer';
import placeReducer from './reducers/placeReducer';
import reservationReducer from './reducers/reservationReducer';
const reducer = combineReducers({
    root: rootReducer,
    auth: userReducer,
    article: articleReducer,
    place: placeReducer,
    reservation: reservationReducer
})

let initialState = {

}
// , composeWithDevTools(applyMiddleware(...middleware))
const middleware = [thunk];
const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));

export default store;