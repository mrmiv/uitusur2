import {GET_DOMAIN_LOCATION} from '../actions/types';

const initialState = {
  domain: ""
}

export default function(state=initialState, action){
  switch(action.type){
    case GET_DOMAIN_LOCATION:
      return {
        domain: action.payload.domain
      }
    default:
      return state
  }
}