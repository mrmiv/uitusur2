import axios from 'axios'
import { GET_RPD, GET_FEEDBACK, GET_ONE_FEEDBACK } from './types'
import { LOADING_REQ, REQ_FAIL, REQ_SUCCESS } from '../types'
import { returnInfo } from '../infoActions'

export const GetDataAbout = () => dispatch => {

    // debugger
    axios.get('/json/disciplines.json')
        .then(res => {
            // console.log("ACTION", res.data[id]);

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

export const getfeedback = () => dispatch => {

    dispatch({
        type: LOADING_REQ
    })

    axios.get('/api/feedback')
        .then(res => {
            // console.log("ACTION", res.data[id]);
            dispatch({
                type: GET_FEEDBACK,
                payload: { FeedbackList: res.data }
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

    axios.get(`/api/feedback/${id}`)
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

export const postfeedback = ({ name, text, post, degree }) => dispatch => {

    dispatch({
        type: LOADING_REQ
    })

    const config = {
        headers: {
            token: sessionStorage.getItem("token")
        }
    }

    const data = { name, text, post, degree }

    axios.post('/api/feedback', data, config)
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

export const patchfeedback = (id, { name, text, post, degree }) => dispatch => {

    dispatch({
        type: LOADING_REQ
    })

    const config = {
        headers: {
            token: sessionStorage.getItem("token")
        }
    }

    const data = { name, text, post, degree }

    axios.patch(`/api/feedback/${id}`, data, config)
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
            token: sessionStorage.getItem("token")
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