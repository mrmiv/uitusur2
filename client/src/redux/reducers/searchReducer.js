import {
    SEARCH_LOADING, 
    SEARCH_SUCCESS, 
    SEARCH_FAIL,
    SEARCH_QUERY_SET} from '../actions/types';

const initialState = {
    isLoading: false,
    query: '',
    result: null
}

export default function(state=initialState, action){
    switch(action.type){
        case SEARCH_LOADING:
            return{
                ...state,
                isLoading: true,
            }
        case SEARCH_QUERY_SET:
            return{
                ...state,
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