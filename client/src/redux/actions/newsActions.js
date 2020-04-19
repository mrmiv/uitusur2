import { 
    LOADING_REQ, 
    REQ_SUCCESS,
    REQ_FAIL,
    GET_NEWS,
    NEWS_LOADING,
    GET_NEWSLIST
} from './types'

import axios from 'axios'
import { returnInfo } from './infoActions';

export const GetNewsList = (type, page = 1, perPage = null) => dispatch => {

    // get /literature/?page=1&?perPage=12?category=all&?sort=asc
    axios.get(`/api/news/${type}?page=${page}&perpage=${perPage || 10}`)
        .then(res => {
            // console.log(res.data);
            
            dispatch({
                type: GET_NEWSLIST,
                payload: {
                    NewsList: res.data.data,
                    totalPage: res.data.pages
                }
            })
            return res.data})
        .catch(err => {
            console.error(err);
    })
}

export const ReadNews = (id) => dispatch => {

    dispatch({
        type: NEWS_LOADING
    })

    // get /literature/book/id
    axios.get(`/api/news/read/${id}`)
        .then(res => {
            dispatch({
                type: GET_NEWS,
                payload: {
                    News: res.data,
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
//     keywords
//     // path,
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
//     formdata.append('doc', doc)
//     formdata.append('title', title)
//     formdata.append('category', category)
//     formdata.append('description', description)
//     formdata.append('annotation', annotation)
//     formdata.append('author', author)

//     let keywords_arr = keywords.split(' ')

//     keywords_arr.forEach(item => {
//         // console.log(item, keywords_arr.indexOf(item));
//          // keywords[:index] = keyword
//         formdata.append(`keywords[${keywords_arr.indexOf(item)}]`, item)
//     })
       
//     // get /literature/book/id
//     axios({
//         url: '/literature',
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