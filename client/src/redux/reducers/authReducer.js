import {
    USER_LOADED,
    USER_LOADING,
    AUTH_ERROR,
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    REGISTER_FAIL,
    REGISTER_SUCCESS,
    LOGOUT_SUCCESS
} from '../actions/types'

const initialState = {
    token: sessionStorage.getItem('token'),
    isAuthenticated: false,
    isLoading: false,
    email: null
}

export default function(state = initialState, action){
    switch (action.type) {
        case USER_LOADING:
            return{
                ...state,
                isLoading:true
            }
        case USER_LOADED:
            return{
                ...state,
                isAuthenticated: true,
                isLoading:false,
                email: action.payload,
            }
        case LOGIN_SUCCESS:
            sessionStorage.setItem('token', action.payload.token)
            return{
                ...state,
                ...action.payload,
                isAuthenticated: true,
                isLoading:false,
            }
        case REGISTER_SUCCESS:
            return{
                ...state,
                ...action.payload,
                isAuthenticated: false,
                isLoading:false,
            }
        case LOGIN_FAIL:
        case REGISTER_FAIL:
        case AUTH_ERROR:
        case LOGOUT_SUCCESS:
            sessionStorage.removeItem('token')
            return{
                ...state,
                token: null,
                email: null,
                isAuthenticated: false,
                isLoading:false
            }
        default:
            return state
    }
}