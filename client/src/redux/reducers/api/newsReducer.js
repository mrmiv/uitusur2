import {
    GET_NEWSLIST,
    NEWS_LOADING,
    GET_NEWS,
    MORE_NEWSLIST,
    REQ_FAIL,
    REQ_SUCCESS,
    LOADING_REQ
} from "../../actions/types"
import { combineReducers } from 'redux';

const NewsState = {
    total: 1,
    NewsList: [],
    isLoading: false
}

const OneNewsState = {
    News: {},
    isLoading: false
}

function NewsReducer(state = NewsState, action) {
    switch (action.type) {
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
        case GET_NEWSLIST:
            // console.log(state)
            return {
                ...state,
                total: action.payload.total,
                NewsList: action.payload.NewsList,
                isLoading: false
            }
        case MORE_NEWSLIST:
            console.log(state.NewsList)
            console.log([...state.NewsList, action.payload.NewsList])
            return {
                ...state,
                total: action.payload.total,
                NewsList: [...state.NewsList, ...action.payload.NewsList],
                isLoading: false
            }
        default:
            return {...state, isLoading: false}
    }
}

function OneNewsReducer(state = OneNewsState, action) {
    switch (action.type) {
        case NEWS_LOADING:
            return {
                ...state,
                isLoading: true
            }
        case GET_NEWS:
            return {
                ...state,
                News: action.payload.News,
                isLoading: false
            }
        default:
            return { ...state, isLoading: false }
    }
}

export default combineReducers({
    newslist: NewsReducer,
    news: OneNewsReducer
})