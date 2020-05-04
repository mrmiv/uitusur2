import axios from 'axios'
import {
  GET_PARAMS,
  GET_PARAM,
  GET_PARAMS_ONPAGE,
} from './types'
import { returnInfo } from '../infoActions';
import { REQ_FAIL, REQ_SUCCESS, LOADING_REQ } from '../types';

export const getAllParam = () => dispatch => {

  dispatch({
    type: LOADING_REQ
  })

  axios.get('/api/param')
    .then(res => {
      dispatch({
        type: GET_PARAMS,
        payload: { data: res.data }
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

export const getPagePrarm = page => dispatch => {

  dispatch({
    type: LOADING_REQ
  })

  axios.get(`/api/param/?page=${page}`)
    .then(res => {
      dispatch({
        type: GET_PARAMS_ONPAGE,
        payload: {
          data: res.data
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

export const getParam = id => dispatch => {

  dispatch({
    type: LOADING_REQ
  })

  axios.get(`/api/param/${id}`)
    .then(res => {
      dispatch({
        type: GET_PARAM,
        payload: {
          param: res.data
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

export const delParam = id => dispatch => {

  dispatch({
    type: LOADING_REQ
  })

  const config = {
    headers: {
      token: sessionStorage.getItem("token")
    }
  }

  axios.delete(`/api/param/${id}`, config)
    .then((res) => {
      dispatch(returnInfo(res.data.message, res.status, "REQ_SUCCESS"));
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

export const postParam = ({ title, page, text }) => dispatch => {

  dispatch({
    type: LOADING_REQ
  })

  const config = {
    headers: {
      token: sessionStorage.getItem("token")
    }
  }

  const data = { title, page, text }

  axios.post(`/api/param`, data, config)
    .then((res) => {
      dispatch(returnInfo(res.data.message, res.status, "REQ_SUCCESS"));
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

export const patchParam = (id, { title, page, text }) => dispatch => {

  dispatch({
    type: LOADING_REQ
  })

  const config = {
    headers: {
      token: sessionStorage.getItem("token")
    }
  }

  const data = { title, page, text }

  axios.patch(`/api/param/${id}`, data, config)
    .then((res) => {
      dispatch(returnInfo(res.data.message, res.status, "REQ_SUCCESS"));
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