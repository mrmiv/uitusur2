import axios from 'axios'
import { LOADING_REQ, REQ_FAIL, REQ_SUCCESS, GET_FILES } from './types'
import { returnInfo } from './infoActions'

export const getfiles = () => dispatch => {

  dispatch({
    type: LOADING_REQ
  })

  axios.get('/api/files')
    .then(res => {
      // console.log("ACTION", res.data[id]);
      dispatch({
        type: GET_FILES,
        payload: { files: res.data }
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

export const postfile = file => dispatch => {

  dispatch({
    type: LOADING_REQ
  })

  const config = {
    headers: {
      "content-type": "multipart/formdata",
      token: sessionStorage.getItem("token")
    }
  }

  const data = new FormData()
  data.append("file", file)

  axios.post(`/api/files`, data, config)
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

export const delfile = id => dispatch => {

  dispatch({
    type: LOADING_REQ
  })

  const config = {
    headers: {
      token: sessionStorage.getItem("token")
    }
  }

  axios.delete(`/api/files/${id}`, config)
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