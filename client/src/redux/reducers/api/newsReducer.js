import {
    GET_NEWSLIST,
    NEWS_LOADING,
    GET_NEWS,
    MORE_NEWSLIST,
    NEWS_LINKS_LOADING,
    GET_NEWS_LINKS,
    GET_ONE_NEWS_LINK,
    LOADING_REQ
} from "../../actions/types"
import { combineReducers } from 'redux';

const NewsState = {
    total: 1,
    type: null,
    NewsList: [],
    isLoading: false
}

const OneNewsState = {
    News: {},
    isLoading: false
}

const NewsLinksState = {
    NewsLinksList: [],
    NewsLink: {},
    type: null,
    isLoading: false,
}

function NewsReducer(state = NewsState, action) {
    switch (action.type) {
        case LOADING_REQ:
            return {
                ...state,
                isLoading: true
            }
        case GET_NEWSLIST:
            return {
                ...state,
                total: action.payload.total,
                type: action.payload.type,
                NewsList: action.payload.NewsList,
                isLoading: false
            }
        case MORE_NEWSLIST:
            return {
                ...state,
                total: action.payload.total,
                type: action.payload.type,
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

function NewsLinksReduсer(state = NewsLinksState, action){
    switch (action.type) {
        case NEWS_LINKS_LOADING:
            return {
                ...state,
                isLoading: true
            }
        case GET_NEWS_LINKS:
            return {
                ...state,
                NewsLinksList: action.payload.NewsLinksList,
                isLoading: false
            }
        case GET_ONE_NEWS_LINK:
            return {
                ...state,
                NewsLink: action.payload.NewsLink,
                isLoading: false
            }
        default:
            return { ...state, isLoading: false }
    }
}

export default combineReducers({
    newslist: NewsReducer,
    news: OneNewsReducer,
    newslinks: NewsLinksReduсer
})