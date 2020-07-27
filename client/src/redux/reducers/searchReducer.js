import {
    SEARCH_LOADING, 
    SEARCH_SUCCESS, 
    SEARCH_FAIL} from '../actions/types';

const initialState = {
    isLoading: false,
    query: '',
    result: {}
}

export default function(state=initialState, action){
    switch(action.type){
        case SEARCH_LOADING:
            return{
                ...state,
                isLoading: true,
                query: action.payload.query
            }
        case SEARCH_SUCCESS:
            return{
                ...state,
                isLoading: false,
                result: action.payload.result 
            }
        case SEARCH_FAIL:
            return{
                ...state,
                isLoading: false,
            }
        default:
            return state
    }
}