import {GET_INFO, CLEAR_INFO} from '../actions/types';

const initialState = {
    msg:null,
    status: null,
    id: null
}

export default function(state=initialState, action){
    switch(action.type){
        case GET_INFO:
            return{
                msg: action.payload.msg,
                status: action.payload.status,
                id: action.payload.id
            }
        case CLEAR_INFO:
            return{
                msg: null,
                status: null,
                id: null
            }
        default:
            return state
    }
}