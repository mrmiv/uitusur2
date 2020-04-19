import {GET_INFO, CLEAR_INFO} from '../actions/types';

// RETURN ERRORS

export const returnInfo =(msg, status, id=null) => {
    return {
        type: GET_INFO,
        payload: {msg, status, id}
    }
}

// CLEAR ERRORS
export const clearInfo =() => {
    return {
        type: CLEAR_INFO,
    }
}