import {
    DOC_LOADING, DOCS_LOADING,
    GET_DOCUMENTS_LIST,
    GET_DOC,
    LOADING_REQ,
    REQ_SUCCESS,
    REQ_FAIL
} from './types'

import axios from 'axios'
import { returnInfo } from './infoActions';

export const GetDocuments = () => dispatch => {

    dispatch({
        type: DOCS_LOADING
    })

    axios.get('/api/docs')
        .then(res => {
            // console.log(res.data);
            dispatch({
                type: GET_DOCUMENTS_LIST,
                payload: {
                    docslist: res.data.data,
                    categories: res.data.categories,
                    subcategories: res.data.subcategories
                }
            })
            return res.data
        })
        .catch((err) => {
            dispatch(returnInfo(err.response.data, err.response.status, "REQ_FAIL"));
            dispatch({
                type: REQ_FAIL,
            });
        })
}

export const GetDocument = (id) => dispatch => {

    dispatch({
        type: DOC_LOADING
    })

    // get /literature/book/id
    axios.get(`/api/docs/${id}`)
        .then(res => {
            dispatch({
                type: GET_DOC,
                payload: {
                    document: res.data,
                }
            })
            return res.data
        })
        .catch((err) => {
            dispatch(returnInfo(err.response.data, err.response.status, "REQ_FAIL"));
            dispatch({
                type: REQ_FAIL,
            });
        })
}

export const postDocument = ({
    title,
    category,
    subcategory,
    doc,
    path,
    date,
}) => dispatch => {

    dispatch({
        type: LOADING_REQ
    })

    const headers = {
        "Content-type": "multipart/form-data",
        "token": sessionStorage.getItem("token")
    }

    const formdata = new FormData()

    if (doc) {
        formdata.append('document', doc)
    } else if (path && !doc) {
        formdata.append('path', path)
    }

    formdata.append('title', title)
    formdata.append('category', category)
    formdata.append('subcategory', subcategory)
    if (date) { formdata.append('date', date) }

    // psot /docs/id
    axios({
        url: '/api/docs',
        method: 'POST',
        headers,
        data: formdata
    })
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

export const patchDocument = (id, {
    title,
    category,
    subcategory,
    doc,
    path,
    date,
}) => dispatch => {

    dispatch({
        type: LOADING_REQ
    })

    const headers = {
        "Content-type": "multipart/form-data",
        "token": sessionStorage.getItem("token")
    }

    const formdata = new FormData()

    if (doc) {
        formdata.append('document', doc)
    } else if (path && !doc) {
        formdata.append('path', path)
    }

    formdata.append('title', title)
    formdata.append('category', category)
    formdata.append('subcategory', subcategory)
    if (date) { formdata.append('date', date) }

    // psot /docs/id
    axios({
        url: `/api/docs/${id}`,
        method: 'PATCH',
        headers,
        data: formdata
    })
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

export const delDocument = id => dispatch => {

    dispatch({
        type: LOADING_REQ
    })

    const config = {
        headers: {
            token: sessionStorage.getItem("token")
        }
    }

    // debugger
    axios.delete(`/api/docs/${id}`, config)
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