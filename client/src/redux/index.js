import {combineReducers} from 'redux'
import navReducer from './reducers/navReducer'
import apiReducer from './reducers/apiReducer' 
import authReducer from './reducers/authReducer' 
import infoReducer from './reducers/infoReducer' 

export default combineReducers({
    nav: navReducer,
    auth: authReducer,
    info: infoReducer,
    api: apiReducer
})