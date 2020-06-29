import axios from 'axios'
import { LOADING_REQ, REQ_FAIL, REQ_SUCCESS, GET_QUIZ } from '../types'
import { returnInfo } from '../infoActions'

export const getquiz = () => dispatch => {

  dispatch({
    type: LOADING_REQ
  })

  axios.get('/api/quiz')
    .then(res => {
      // console.log("ACTION", res.data[id]);
      dispatch({
        type: GET_QUIZ,
        payload: { quiz: res.data }
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

export const updatequiz = quiz => dispatch => {

  dispatch({
    type: LOADING_REQ
  })

  const config = {
    headers: {
      "content-type": "application/json",
      token: sessionStorage.getItem("token")
    }
  }

  const data = { quiz }

  axios.post(`/api/quiz`, data, config)
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

export const delquiz = () => dispatch => {

  dispatch({
    type: LOADING_REQ
  })

  const config = {
    headers: {
      token: sessionStorage.getItem("token")
    }
  }

  axios.delete(`/api/quiz`, config)
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