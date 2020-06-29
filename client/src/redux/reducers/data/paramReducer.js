import {
  GET_PARAMS,
  GET_PARAM, 
  GET_PARAMS_ONPAGE,
  GET_ACTIVE_PARAMS,
  GET_ACTIVE_PARAMS_ONPAGE
} from '../../actions/data_actions/types'
import { LOADING_REQ } from '../../actions/types';

const ParamState = {
  params_list: [],
  params_list_onpage: [],
  param: {},
  isLoading: false
}

export default function (state = ParamState, action) {
  switch (action.type) {
    case LOADING_REQ:
      return {
        ...state,
        isLoading: true
      }
    case GET_PARAM:
      return {
        ...state,
        param: action.payload.param,
        isLoading: false
      }
    case GET_PARAMS:
      return {
        ...state,
        params_list: action.payload.data,
        isLoading: false
      }
    case GET_PARAMS_ONPAGE:
      return {
        ...state,
        params_list_onpage: action.payload.data,
        isLoading: false
      }
    case GET_ACTIVE_PARAMS:
      return {
        ...state,
        params_list: action.payload.data,
        isLoading: false
      }
    case GET_ACTIVE_PARAMS_ONPAGE:
      return {
        ...state,
        params_list_onpage: action.payload.data,
        isLoading: false
      }
    default:
      return { ...state, isLoading: false };
  }
}