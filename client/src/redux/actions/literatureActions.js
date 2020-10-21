import {
    GET_LITERATURE,
    BOOK_LOADING,
    LOADING_LITERATURE,
    GET_BOOK,
    LOADING_REQ,
    REQ_SUCCESS,
    REQ_FAIL,
    SET_LITERATURE_FILTER,
} from './types'

import axios from 'axios'
import { returnInfo } from './infoActions';

export const GetLiteraturePerPage = (page = 1, perPage = 12, filter = null, sort = 1, search='') => dispatch => {

    dispatch({
        type: LOADING_LITERATURE
    })

    dispatch({
        type:SET_LITERATURE_FILTER,
        payload: {page, perPage, filter, sort, search}
    })


    let query = `/api/literature?page=${page}&perpage=${perPage}&sort=${sort}${filter !== null ? `&filter=${filter}`: ''}&search=${search}`

    // get /literature/?page=1&?perPage=12?category=all&?sort=asc
    axios.get(query)
        .then(res => {
            dispatch({
                type: GET_LITERATURE,
                payload: {
                    LiteratureList: res.data.data,
                    total: res.data.total,
                    categoryFields: res.data.fields
                }
            })
            return res.data
        })
        .then(()=>{
            dispatch({
                type: REQ_SUCCESS
            })
        })
        .catch(err => {
            dispatch({type: REQ_FAIL})
            dispatch(returnInfo(err.response.message, err.response.status, "REQ_FAIL"))
        })
}

export const setLiteratureFilters = (page=1, perPage = 12, filter=null, sort=1, search='') => dispatch => {
    dispatch({
        type:SET_LITERATURE_FILTER,
        payload: {page, perPage, filter, sort, search}
    })
}

export const GetCurrentBook = (field, value) => dispatch => {

    dispatch({
        type: BOOK_LOADING
    })

    let url = 'book-by-id'

    if(field !== 'id'){
        url = 'book'
    }

    // get /literature/book/id
    axios.get(`/api/literature/${url}/${value}`)
        .then(res => {
            dispatch({
                type: GET_BOOK,
                payload: {
                    Book: res.data,
                }
            })
            return res.data
        })
        .catch(err => {
            dispatch(returnInfo(err.response.data, err.response.status, 'REQ_FAIL'))
            dispatch({
                type: REQ_FAIL
            })
        })
}

export const postLiterature = Book => dispatch => {

    dispatch({
        type: LOADING_REQ
    })

    const config = {
        headers : {
            "content-type": 'multipart-formdata',
            "token": localStorage.getItem("token")
        }
    }

    const formdata = new FormData()
    // console.log(News);
    Object.keys(Book).map( key => {
        formdata.append (key, Book[key])        
    })

    axios.post('/api/literature', formdata, config)
        .then(res => {
            dispatch(returnInfo(res.data, res.status, 'REQ_SUCCESS'))
            dispatch({
                type: REQ_SUCCESS
            })
        })
        .catch(err => {
            dispatch(returnInfo(err.response.data, err.response.status, 'REQ_FAIL'))
            dispatch({
                type: REQ_FAIL
            })
        })
}

export const patchLiterature = (id, Book, oldDoc) => dispatch => {

    dispatch({
        type: LOADING_REQ
    })

    const config = {
        headers : {
        "content-type": 'multipart-formdata',
        "token": localStorage.getItem("token")
        }
    }

    const formdata = new FormData()

    Object.keys(Book).map( key => {
        formdata.append (key, Book[key])
    })
    formdata.append('oldDoc', oldDoc)

    axios.patch(`/api/literature/book/${id}`, formdata, config)
        .then(res => {
            dispatch(returnInfo(res.data, res.status, 'REQ_SUCCESS'))
            dispatch({
                type: REQ_SUCCESS
            })
        })
        .catch(err => {
            dispatch(returnInfo(err.response.data, err.response.status, 'REQ_FAIL'))
            dispatch({
                type: REQ_FAIL
            })
        })
}

export const delLiterature = (id, page) => dispatch => {

    dispatch({
        type: LOADING_REQ
    })

    const config = {
        headers: { "token": localStorage.getItem("token") }
    }

    // debugger
    axios.delete(`/api/literature/book/${id}`, config)
        .then(res => {
            dispatch(returnInfo(res.data, res.status, 'REQ_SUCCESS'))
            dispatch({
                type: REQ_SUCCESS
            })
            dispatch(GetLiteraturePerPage(page))
        })
        .catch(err => {
            dispatch(returnInfo(err.response.data, err.response.status, 'REQ_FAIL'))
            dispatch({
                type: REQ_FAIL
            })
        })
}