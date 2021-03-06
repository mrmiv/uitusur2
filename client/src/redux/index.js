import { combineReducers } from 'redux'
import navReducer from './reducers/navReducer'
import apiReducer from './reducers/apiReducer'
import authReducer from './reducers/authReducer'
import infoReducer from './reducers/infoReducer'
import paramReducer from './reducers/data/paramReducer'
import locationReducer from './reducers/locationReducer'
import searchReducer from './reducers/searchReducer'

export default combineReducers({
    nav: navReducer,
    auth: authReducer,
    info: infoReducer,
    api: apiReducer,
    param: paramReducer,
    location: locationReducer,
    search: searchReducer
})