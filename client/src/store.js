import {createStore, applyMiddleware, compose} from 'redux'
import thunk from 'redux-thunk'
import rootReducer from './redux/index'


const initialStore = {}
const middleware = [thunk]

const store = createStore(rootReducer, initialStore, compose(
    applyMiddleware(...middleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ 
        ? window.__REDUX_DEVTOOLS_EXTENSION__() 
        : (a) => a
))

export default store