import { GET_CURATORS, GET_CURATOR } from './types'

import axios from 'axios'
import { LOADING_REQ, REQ_FAIL, REQ_SUCCESS } from '../types'
import { returnInfo } from '../infoActions'

export const GetAllCurators = () => dispatch => {

    dispatch({
        type: LOADING_REQ
    })

    axios.get('/api/curator')
        .then(res => {
            // console.log("ACTION", res.data[id]);
            dispatch({
                type: GET_CURATORS,
                payload: { CuratorList: res.data }
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

export const GetCurator = id => dispatch => {

    dispatch({
        type: LOADING_REQ
    })

    axios.get(`/api/curator/${id}`)
        .then(res => {
            // console.log("ACTION", res.data);
            dispatch({
                type: GET_CURATOR,
                payload: { Curator: res.data }
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

export const postCurator = (curator) => dispatch => {

    dispatch({
        type: LOADING_REQ
    })

    const config = {
        headers: {
            token: localStorage.getItem("token")
        }
    }

    axios.post(`/api/curator`, curator, config)
        .then(res => {
            // console.log("ACTION", res.data);
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

export const delCurator = id => dispatch => {

    dispatch({
        type: LOADING_REQ
    })

    const config = {
        headers: {
            token: localStorage.getItem("token")
        }
    }

    axios.delete(`/api/curator/${id}`, config)
        .then(res => {
            // console.log("ACTION", res.data);
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

export const patchCurator = (id, curator) => dispatch => {

    dispatch({
        type: LOADING_REQ
    })

    const config = {
        headers: {
            token: localStorage.getItem("token")
        }
    }

    axios.patch(`/api/curator/${id}`, curator, config)
        .then(res => {
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