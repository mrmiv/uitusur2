import axios from 'axios'
import {returnInfo} from './infoActions'

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

// Check token & load user
// to auth/

export const loaduser = () => (dispatch, getState) => {
    // User loading
    dispatch({
        type: USER_LOADING 
    })

    axios.get('/api/auth', tokenConfig(getState))
        .then(res => dispatch({
            type: USER_LOADED,
            payload: res.data
        }))
        .catch(err => {
            dispatch(returnInfo(err.response.data.message, err.response.status))
            dispatch({
                type: AUTH_ERROR
            })
        })
}

export const register = ({email, password}) =>  dispatch => {

    dispatch({
        type: USER_LOADING
    })
    
    // Headers
    const config = {
        headers:{
            "Content-type" : "application/json"
        }
    }

    // req body
    const body = JSON.stringify({email, password})

    // console.log(body);
    
    axios.post('/api/auth/register', body, config)
        .then(res => {
            dispatch(returnInfo(res.data.message, res.status, 'REGISTER_SUCCESS'))
            dispatch({
                type: REGISTER_SUCCESS
            })
        })
        .catch(err => {
            dispatch(returnInfo(err.response.data.message, err.response.status, 'REGISTER_FAIL'))
            dispatch({
                type: REGISTER_FAIL
            })
        })
}

export const login = ({email, password}) => dispatch => {
    
    // Headers
    const config = {
        headers:{
            "Content-type" : "application/json"
        }
    }

    // req body
    const body = JSON.stringify({email, password})

    dispatch({
        type: USER_LOADING
    })

    axios.post('/api/auth/login', body, config)
        .then(res => dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        }))
        .catch(err => {
            dispatch(returnInfo(err.response.data.message, err.response.status, 'LOGIN_FAIL'))
            dispatch({
                type: LOGIN_FAIL
            })
        })
}

export const logout = () => {
    return {
        type: LOGOUT_SUCCESS
    }
}

export const tokenConfig = (getState) =>{
        // Get token from LS
        const token = getState().auth.token

        const config = {
            headers:{
                "Content-type" : "application/json"
            }
        }
    
        if (token){
            config.headers['token'] = token
        }

        return config
}