import {
  KNOWLEDGE_IS_LOADING,
  REQ_FAIL,
  REQ_SUCCESS,
  GET_ALL_KNOWLEDGE,
  GET_KNOWLEDGE_BY_ID,
  DELETE_KNOWLEDGE,
  SET_MARKS,
  LOADING_REQ
} from '../actions/types';
import { returnInfo } from './infoActions';
import axios from 'axios'

export const setMarks = (marks) => dispatch => {
  dispatch({
    type: SET_MARKS,
    payload: {marks}
  })
}

export const getKnowledgeList = () => dispatch => {
  
  dispatch({
    type: KNOWLEDGE_IS_LOADING
  })

  let query = `/api/knowledge/`

  axios.get(query)
    .then(res => {
      
      const knowledgeList = res.data

      dispatch({
        type: GET_ALL_KNOWLEDGE,
        payload: {
          podcast: knowledgeList.filter( item => item.type === "Подкаст"),
          audiobook: knowledgeList.filter( item => item.type === "Аудиокнига"),
          course: knowledgeList.filter( item => item.type === "Курс"),
          app: knowledgeList.filter( item => item.type === "Приложение"),
          other: knowledgeList.filter( item => item.type === "Другое"),
        }
      })
    })
    .catch(err => {
      dispatch({type: REQ_FAIL})
      dispatch(returnInfo(err.response.message, err.response.status, "REQ_FAIL"))
    })

}

export const getKnowledgeById = (id) => dispatch => {
  
  dispatch({
    type: KNOWLEDGE_IS_LOADING
  })

  let query = `/api/knowledge/${id}`

  axios.get(query)
    .then(res => {
      dispatch({
        type: GET_KNOWLEDGE_BY_ID,
        payload: {knowledge: res.data}
      })
    })
    .catch(err => {
      dispatch({type: REQ_FAIL})
      dispatch(returnInfo(err.response.message, err.response.status, "REQ_FAIL"))
    })
}

export const postKnowledge = (knowledge) => dispatch => {
  
  dispatch({
    type: LOADING_REQ
  })

  const config = {
    headers: {
      "token": localStorage.getItem("token"),
      "content-data": "multipart/form-data"
    }
  }

  const data = new FormData()
  Object.keys(knowledge).map( key => {
    data.append (key, knowledge[key])        
  })

  let query = `/api/knowledge`

  axios.post(query, data, config)
    .then(res => {
      dispatch(returnInfo(res.data, res.status, 'REQ_SUCCESS'))
      dispatch({type: REQ_SUCCESS})
    })
    .catch(err => {
      dispatch(returnInfo(err.response.message, err.response.status, "REQ_FAIL"))
      dispatch({type: REQ_FAIL})
    })
}

export const patchKnowledge = (id, knowledge) => dispatch => {
  
  dispatch({
    type: LOADING_REQ
  })

  const config = {
    headers: {
      "token": localStorage.getItem("token"),
      "content-data": "multipart/form-data"
    }
  }

  const data = new FormData()
  Object.keys(knowledge).map( key => {
    data.append (key, knowledge[key])        
  })

  let query = `/api/knowledge/${id}`

  axios.patch(query, data, config)
    .then(res => {
      dispatch(returnInfo(res.data, res.status, 'REQ_SUCCESS'))
      dispatch({type: REQ_SUCCESS})
    })
    .catch(err => {
      dispatch(returnInfo(err.response.message, err.response.status, "REQ_FAIL"))
      dispatch({type: REQ_FAIL})
    })
}

export const deleteKnowledge = (id, type) => dispatch => {
  
  dispatch({
    type: LOADING_REQ
  })

  const config = {
    headers: {
      "token": localStorage.getItem("token"),
      "content-data": "multipart/form-data"
    }
  }

  let query = `/api/knowledge/${id}`

  axios.delete(query, config)
    .then(res => {
      dispatch(returnInfo(res.data, res.status, 'REQ_SUCCESS'))
      dispatch({type: REQ_SUCCESS})
    })
    .then(() => {
      dispatch({
        type: DELETE_KNOWLEDGE, 
        payload: {_id: id, type}
      })
    })
    .catch(err => {
      dispatch(returnInfo(err.response.message, err.response.status, "REQ_FAIL"))
      dispatch({type: REQ_FAIL})
    })
}