import {OPEN_NAV, CLOSE_NAV} from '../actions/types';

const initialState = {
    open: false
}

export default function(state=initialState, action){
    switch(action.type){
        case CLOSE_NAV:
        case OPEN_NAV:
            return{
                open: action.payload.open
            }
        default:
            return state
    }
}