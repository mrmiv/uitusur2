import {
    GET_LITERATURE,
    BOOK_LOADING,
    GET_BOOK,
    REQ_FAIL,
    REQ_SUCCESS,
    LOADING_REQ
} from "../../actions/types"
import { combineReducers } from 'redux';

const LiteratureState = {
    totalPage: 1,
    LiteratureList: [],
    isLoading: false
}

const BookState = {
    Book:{},
    isLoading: false
}

function LiteratureReducer(state=LiteratureState, action){
    switch (action.type) {
        case LOADING_REQ:
            return{
                ...state,
                isLoading: true
            }
        case REQ_FAIL:
        case REQ_SUCCESS:
            return{
                ...state,
                isLoading: false
            }
        case GET_LITERATURE: 
            // console.log(state)
            return{
                ...state,
                totalPage: action.payload.totalPage,
                LiteratureList: action.payload.LiteratureList,
                isLoading: false
            }
        default:
            return state
    }
}

function BookReducer(state=BookState, action){
    switch (action.type) {
        case BOOK_LOADING:
            return{
                ...state,
                isLoading: true
            }
        case GET_BOOK:
            return{
                ...state,
                Book: action.payload.Book,
                isLoading: false
            }
        default:
            return state
    }
}

export default combineReducers({
    literature: LiteratureReducer,
    book: BookReducer
})