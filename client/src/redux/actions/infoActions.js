import {GET_INFO, CLEAR_INFO} from '../actions/types';

export const returnInfo = (msg = "Что-то пошло не так", status = 400, id=null) => {
    return {
        type: GET_INFO,
        payload: {msg, status, id}
    }
}

// CLEAR ERRORS
export const clearInfo = () => {
    return {
        type: CLEAR_INFO,
    }
}