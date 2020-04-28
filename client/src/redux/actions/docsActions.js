import { 
    DOC_LOADING,DOCS_LOADING,
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
            return res.data})
        .catch(err => {
            console.error(err);
    })
}

export const GetDoc = (id) => dispatch => {

    dispatch({
        type: DOC_LOADING
    })

    // get /literature/book/id
    axios.get(`/api/docs/${id}`)
        .then(res => {
            dispatch({
                type: GET_DOC,
                payload: {
                    Doc: res.data,
                }
            })
            return res.data})
        .catch(err => {
            console.error(err);
    })
}

// export const postLiterature = ({
//     title,
//     category,
//     description,
//     annotation,
//     image,
//     doc,
//     author,
//     keywords,
//     path,
// }) => dispatch => {

//     dispatch({
//         type: LOADING_REQ
//     })
    
//     const headers={
//         "Content-type" : "multipart/form-data",
//         "token": sessionStorage.getItem("token")
//     }

//     const formdata = new FormData()

//     formdata.append('image', image)
//     if(doc){formdata.append('doc', doc)}
//     formdata.append('title', title)
//     formdata.append('category', category.toLowerCase())
//     formdata.append('description', description)
//     formdata.append('annotation', annotation)
//     formdata.append('author', author)
//     formdata.append('path', path)

//     let keywords_arr = keywords.split(' ')

//     keywords_arr.forEach(item => {
//          // keywords[:index] = keyword
//         formdata.append(`keywords`, item)
//     })
       
//     // get /literature/book/id
//     axios({
//         url: '/api/literature',
//         method: 'POST',
//         headers,
//         data: formdata
//     })
//     .then(res => {
//         dispatch(returnInfo(res.data.message, res.status, 'REQ_SUCCESS'))
//         dispatch({
//             type: REQ_SUCCESS
//         })
//     })
//     .catch(err => {
//         dispatch(returnInfo(err.response.data, err.response.status, 'REQ_FAIL'))
//         dispatch({
//             type: REQ_FAIL
//         })
//     })
// }

// export const delLiterature = (id, page) => dispatch => {

//     dispatch({
//         type: LOADING_REQ
//     })

//     const config={
//         headers:{"token": sessionStorage.getItem("token")}
//     }

//     // debugger
//     axios.delete(`/api/literature/book/${id}`,config)
//         .then(res => {
//             dispatch(returnInfo(res.data.message, res.status, 'REQ_SUCCESS'))
//             dispatch({
//                 type: REQ_SUCCESS
//             })
//             dispatch(GetLiteraturePerPage(page))
//         })
//         .catch(err => {
//             dispatch(returnInfo(err.response.data, err.response.status, 'REQ_FAIL'))
//             dispatch({
//                 type: REQ_FAIL
//         })
//     })
// }