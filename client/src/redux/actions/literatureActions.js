import {
    GET_LITERATURE,
    BOOK_LOADING,
    LOADING_LITERATURE,
    GET_BOOK,
    LOADING_REQ,
    REQ_SUCCESS,
    REQ_FAIL
} from './types'

import axios from 'axios'
import { returnInfo } from './infoActions';

export const GetLiteraturePerPage = (page = 1, perPage = 12, filter = null, sort = 1, keywords=[]) => dispatch => {

    dispatch({
        type: LOADING_LITERATURE
    })
    // console.log(keywords);
    let keywords_string = ''

    if (keywords.length !== 0){

        keywords_string = keywords.reduce(function(sum, current) {
            return sum +'&keywords='+ current;
          }, '');
    }

    // console.log(keywords_string);

    let query = `/api/literature?page=${page}&perpage=${perPage}&sort=${sort}${filter !== null ? `&filter=${filter}`: ''}${keywords_string}`
    // console.log(query);

    // get /literature/?page=1&?perPage=12?category=all&?sort=asc
    axios.get(query)
        .then(res => {
            // console.log(res.data);
            dispatch({
                type: GET_LITERATURE,
                payload: {
                    LiteratureList: res.data.data,
                    total: res.data.total,
                    categoryFields: res.data.fields,
                    page,
                    filter,
                    sort
                }
            })
            return res.data
        })
        .catch(err => {
            console.error(err);
        })
}

export const GetCurrentBook = (id) => dispatch => {

    dispatch({
        type: BOOK_LOADING
    })

    // get /literature/book/id
    axios.get(`/api/literature/book/${id}`)
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
            console.error(err);
        })
}

export const postLiterature = ({
    title,
    category,
    description,
    annotation,
    image,
    doc,
    author,
    keywords,
    path,
}) => dispatch => {

    dispatch({
        type: LOADING_REQ
    })

    const headers = {
        "Content-type": "multipart/form-data",
        "token": sessionStorage.getItem("token")
    }

    const formdata = new FormData()

    formdata.append('image', image)
    if (doc) { formdata.append('doc', doc) }
    formdata.append('title', title)
    formdata.append('category', category.toLowerCase())
    formdata.append('description', description)
    formdata.append('annotation', annotation)
    formdata.append('author', author)
    formdata.append('path', path)

    let keywords_arr = keywords.split(' ')

    keywords_arr.forEach(item => {
        // keywords[:index] = keyword
        formdata.append(`keywords`, item)
    })

    // get /literature/book/id
    axios({
        url: '/api/literature',
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

export const patchLiterature = (id, {
    title,
    category,
    description,
    annotation,
    author,
    keywords,
    path,
}) => dispatch => {

    dispatch({
        type: LOADING_REQ
    })

    const headers = {
        "Content-type": "multipart/form-data",
        "token": sessionStorage.getItem("token")
    }

    const formdata = new FormData()

    formdata.append('title', title)
    formdata.append('category', category.toLowerCase())
    formdata.append('description', description)
    formdata.append('annotation', annotation)
    formdata.append('author', author)
    formdata.append('path', path)

    let keywords_arr = keywords.split(' ')

    keywords_arr.forEach(item => {
        // keywords[:index] = keyword
        formdata.append(`keywords`, item)
    })

    // get /literature/book/id
    axios({
        url: `/api/literature/book/${id}`,
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

export const delLiterature = (id, page) => dispatch => {

    dispatch({
        type: LOADING_REQ
    })

    const config = {
        headers: { "token": sessionStorage.getItem("token") }
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