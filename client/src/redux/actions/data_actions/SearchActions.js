import axios from 'axios'
import { 
    SEARCH_LOADING, 
    SEARCH_SUCCESS, 
    SEARCH_FAIL,
    SEARCH_QUERY_SET } from '../types'
import { returnInfo } from '../infoActions'
import { set } from 'mongoose'

export const setQuery = query => dispatch => {

    dispatch({
        type: SEARCH_QUERY_SET,
        payload: {query}
    })
}

export const Search = query => dispatch => {

    dispatch(setQuery(query))

    dispatch({
        type: SEARCH_LOADING,
    })


    setTimeout(() => {
        dispatch({
            type: SEARCH_FAIL
        })
    }, 1000);

}