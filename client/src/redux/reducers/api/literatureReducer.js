import {
    GET_LITERATURE,
    BOOK_LOADING,
    GET_BOOK,
    REQ_FAIL,
    REQ_SUCCESS,
    LOADING_REQ,
    LOADING_LITERATURE
} from "../../actions/types"
import { combineReducers } from 'redux';

const LiteratureState = {
    total: 1,
    categoryFields: [],
    LiteratureList: [],
    isLoading: false,
    page: 1,
    perPage: 12,
    keywords: [],
    filter: null,
    sort: 1
}

const BookState = {
    Book: {},
    isLoading: false
}

function LiteratureReducer(state = LiteratureState, action) {
    switch (action.type) {
        case LOADING_LITERATURE:
        case LOADING_REQ:
            return {
                ...state,
                isLoading: true
            }
        case REQ_FAIL:
        case REQ_SUCCESS:
            return {
                ...state,
                isLoading: false
            }
        case GET_LITERATURE:
            // console.log(state)
            return {
                total: action.payload.total,
                LiteratureList: action.payload.LiteratureList,
                categoryFields: action.payload.categoryFields,
                isLoading: false,
                page: action.payload.page,
                perPage: action.payload.perPage,
                keywords: action.payload.keywords,
                filter: action.payload.filter,
                sort: action.payload.sort,
            }
        default:
            return { ...state, isLoading: false }
    }
}

function BookReducer(state = BookState, action) {
    switch (action.type) {
        case BOOK_LOADING:
            return {
                ...state,
                isLoading: true
            }
        case GET_BOOK:
            return {
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