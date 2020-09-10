import axios from 'axios'
import { 
    SEARCH_LOADING, 
    SEARCH_SUCCESS, 
    SEARCH_FAIL,
    SEARCH_QUERY_SET } from '../types'
import { returnInfo } from '../infoActions'

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

    const url = `/api/search`
    const data = {query}

    axios.post(url, data)
        .then(res=>{
            dispatch({
                type:SEARCH_SUCCESS,
                payload: {result: res.data}
            })
            return res.data
        })
        .catch(err=>{
            dispatch(returnInfo(err.response.data, err.response.status, "REQ_FAIL"));
            dispatch({
                type: SEARCH_FAIL
            })
        })
}