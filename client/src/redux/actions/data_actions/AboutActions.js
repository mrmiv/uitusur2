import axios from 'axios'
import { GET_RPD, GET_FEEDBACK, GET_ONE_FEEDBACK, GET_QUOTE } from './types'
import { LOADING_REQ, REQ_FAIL, REQ_SUCCESS } from '../types'
import { returnInfo } from '../infoActions'

export const GetDataAbout = () => dispatch => {

    // debugger
    axios.get('/json/disciplines.json')
        .then(res => {

            dispatch({
                type: GET_RPD,
                payload: { RPDList: res.data }
            })
            return res.data
        })
        .catch(err => {
            console.error(err);
        })
}

export const getfeedback = (isActive, type) => dispatch => {

    dispatch({
        type: LOADING_REQ
    })

    let query = ``

    if (type || isActive){
        const type_query = type ? `type=${type}` : ''
        const isActive_query = isActive ? `isActive=${isActive}` : ''

        query = `?${isActive_query}&${type_query}`
    }

    const url = `/api/feedback${query}`

    axios.get(url)
        .then(res => {
            // console.log("ACTION", res.data[id]);
            dispatch({
                type: GET_FEEDBACK,
                payload: { 
                    FeedbackList: res.data, 
                }
            })
            return res.data
        })
        .catch((err) => {
            dispatch(returnInfo(err.response.data, err.response.status, "REQ_FAIL"));
            dispatch({
                type: REQ_FAIL,
            });
        });
}


export const get_onefeedback = id => dispatch => {

    dispatch({
        type: LOADING_REQ
    })

    axios.get(`/api/feedback/item/${id}`)
        .then(res => {
            // console.log("ACTION", res.data[id]);
            dispatch({
                type: GET_ONE_FEEDBACK,
                payload: { Feedback: res.data }
            })
            return res.data
        })
        .catch((err) => {
            dispatch(returnInfo(err.response.data, err.response.status, "REQ_FAIL"));
            dispatch({
                type: REQ_FAIL,
            });
        });
}

export const postfeedback = (feedback) => dispatch => {

    dispatch({
        type: LOADING_REQ
    })

    const config = {
        headers: {
            token: localStorage.getItem("token")
        }
    }

    axios.post('/api/feedback', feedback, config)
        .then((res) => {
            dispatch(returnInfo(res.data, res.status, "REQ_SUCCESS"));
            dispatch({
                type: REQ_SUCCESS,
            });
        })
        .catch((err) => {
            dispatch(returnInfo(err.response.data, err.response.status, "REQ_FAIL"));
            dispatch({
                type: REQ_FAIL,
            });
        });

}

export const patchfeedback = (id, feedback) => dispatch => {

    dispatch({
        type: LOADING_REQ
    })

    const config = {
        headers: {
            token: localStorage.getItem("token")
        }
    }

    axios.patch(`/api/feedback/${id}`, feedback, config)
        .then((res) => {
            dispatch(returnInfo(res.data, res.status, "REQ_SUCCESS"));
            dispatch({
                type: REQ_SUCCESS,
            });
        })
        .catch((err) => {
            dispatch(returnInfo(err.response.data, err.response.status, "REQ_FAIL"));
            dispatch({
                type: REQ_FAIL,
            });
        });

}

export const delfeedback = (id) => dispatch => {

    dispatch({
        type: LOADING_REQ
    })

    const config = {
        headers: {
            token: localStorage.getItem("token")
        }
    }

    axios.delete(`/api/feedback/${id}`, config)
        .then((res) => {
            dispatch(returnInfo(res.data, res.status, "REQ_SUCCESS"));
            dispatch({
                type: REQ_SUCCESS,
            });
        })
        .catch((err) => {
            dispatch(returnInfo(err.response.data, err.response.status, "REQ_FAIL"));
            dispatch({
                type: REQ_FAIL,
            });
        });

}