import axios from 'axios'
import { LOADING_REQ, REQ_FAIL, REQ_SUCCESS, GET_FILES, UPLOAD_FILE, DELETE_FILE } from './types'
import { returnInfo } from './infoActions'

export const getfiles = () => dispatch => {

  dispatch({
    type: LOADING_REQ
  })

  const config = {
    headers: {
      token: localStorage.getItem("token")
    }
  }

  axios.get('/api/files', config)
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

export const postfile = (file, filePath) => dispatch => {

  dispatch({
    type: LOADING_REQ
  })

  const headers = {
    "content-type": "multipart/form-data",
    token: localStorage.getItem("token")
  }

  let formdata = new FormData()
  formdata.append("file", file)
  formdata.append("filePath", filePath)

  axios({
    url: `/api/files`,
    method: "POST",
    headers,
    data: formdata,
  })
  .then(res => {
    dispatch(returnInfo(res.data, res.status, "REQ_SUCCESS"));
    dispatch({
      type: REQ_SUCCESS,
    })
    return res.data
  })
  .then(data => {
    dispatch({
      type: UPLOAD_FILE,
      payload: { file: data.file }
    })
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
      token: localStorage.getItem("token")
    }
  }

  axios.delete(`/api/files/${id}`, config)
    .then(res => {
      dispatch(returnInfo(res.data, res.status, "REQ_SUCCESS"));
      dispatch({
        type: REQ_SUCCESS,
      })
      return res.data
    })
    .then(data =>{
      dispatch({
        type: DELETE_FILE,
        payload: { id: data.file._id}
      })
    })
    .catch((err) => {
      dispatch(returnInfo(err.response.data, err.response.status, "REQ_FAIL"));
      dispatch({
        type: REQ_FAIL,
      });
    });
}