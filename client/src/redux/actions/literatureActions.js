import { 
    GET_LITERATURE, 
    BOOK_LOADING, 
    GET_BOOK, 
    LOADING_REQ, 
    REQ_SUCCESS,
    REQ_FAIL
} from './types'

import axios from 'axios'
import { returnInfo } from './infoActions';

export const GetLiteraturePerPage = (page = 1, perPage = null, filter = null, sort = null) => dispatch => {

    let query = `/api/literature?page=${page}&perpage=${perPage || 12}&sort=${sort || 1}${filter!==null? `&filter=${filter}`:''}`
    console.log(query);
    
    // get /literature/?page=1&?perPage=12?category=all&?sort=asc
    axios.get(query)
        .then(res => {
            console.log(res.data);
            
            dispatch({
                type: GET_LITERATURE,
                payload: {
                    LiteratureList: res.data.data,
                    totalPage: res.data.pages,
                    categoryFields: res.data.fields
                }
            })
            return res.data})
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
            return res.data})
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
    keywords
    // path,
}) => dispatch => {

    dispatch({
        type: LOADING_REQ
    })
    
    const headers={
        "Content-type" : "multipart/form-data",
        "token": sessionStorage.getItem("token")
    }

    const formdata = new FormData()

    formdata.append('image', image)
    if(doc){formdata.append('doc', doc)}
    formdata.append('title', title)
    formdata.append('category', category.toLowerCase())
    formdata.append('description', description)
    formdata.append('annotation', annotation)
    formdata.append('author', author)

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
        dispatch(returnInfo(res.data.message, res.status, 'REQ_SUCCESS'))
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

    const config={
        headers:{"token": sessionStorage.getItem("token")}
    }

    // debugger
    axios.delete(`/api/literature/book/${id}`,config)
        .then(res => {
            dispatch(returnInfo(res.data.message, res.status, 'REQ_SUCCESS'))
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