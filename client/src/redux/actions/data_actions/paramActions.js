import axios from 'axios'
import {
  GET_PARAMS,
  GET_PARAM,
  GET_PARAMS_ONPAGE,
  GET_ACTIVE_PARAMS,
  GET_ACTIVE_PARAMS_ONPAGE
} from './types'
import { returnInfo } from '../infoActions'
import { REQ_FAIL, REQ_SUCCESS, LOADING_REQ } from '../types'

export const getActiveParams = () => dispatch => {

  dispatch({
    type: LOADING_REQ
  })

  axios.get('/api/param/active')
    .then(res => {
      dispatch({
        type: GET_ACTIVE_PARAMS,
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

export const getActiveParamsOnpage = page => dispatch => {

  dispatch({
    type: LOADING_REQ
  })

  axios.get(`/api/param/active?page=${page}`)
    .then(res => {
      dispatch({
        type: GET_ACTIVE_PARAMS_ONPAGE,
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

export const getAllParam = () => dispatch => {

  dispatch({
    type: LOADING_REQ
  })

  const config = {
    headers: {
      token: localStorage.getItem("token")
    }
  }
  axios.get('/api/param', config)
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

export const getPageParam = page => dispatch => {

  dispatch({
    type: LOADING_REQ
  })

  const config = {
    headers: {
      token: localStorage.getItem("token")
    }
  }

  axios.get(`/api/param/?page=${page}`, config)
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
      token: localStorage.getItem("token")
    }
  }

  axios.delete(`/api/param/${id}`, config)
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

export const postParam = Param => dispatch => {

  dispatch({
    type: LOADING_REQ
  })

  const config = {
    headers: {
      token: localStorage.getItem("token")
    }
  }

  axios.post(`/api/param`, Param, config)
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

export const setActivityOrOrder = (id, isActive, page, onlyActive) => dispatch => {
  dispatch({
    type: LOADING_REQ
  })

  const config = {
    headers: {
      token: localStorage.getItem("token")
    }
  }

  const data = { isActive }

  axios.put(`/api/param/${id}`, data, config)
    .then((res) => {
      dispatch(returnInfo(res.data, res.status, "REQ_SUCCESS"));
      dispatch({
        type: REQ_SUCCESS,
      });
      
      if (page){
        if (onlyActive){
          dispatch(getActiveParamsOnpage(page))
        } else {
          dispatch(getPageParam(page))
        }
      } else {
        if (onlyActive){
          dispatch(getActiveParams())
        } else {
          dispatch(getAllParam())
        }
      }

    })
    .catch((err) => {
      dispatch(returnInfo(err.response.data, err.response.status, "REQ_FAIL"));
      dispatch({
        type: REQ_FAIL,
      });
    });

}

export const patchParam = (id, Param) => dispatch => {

  dispatch({
    type: LOADING_REQ
  })

  const config = {
    headers: {
      token: localStorage.getItem("token")
    }
  }

  axios.patch(`/api/param/${id}`, Param, config)
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