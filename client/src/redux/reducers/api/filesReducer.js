import {
  GET_FILES,
  LOADING_REQ
} from '../../actions/types'

const FilesState = {
  files: [],
  isLoading: false
}

export default function (state = FilesState, action) {
  switch (action.type) {
    case LOADING_REQ:
      return {
        ...state,
        isLoading: true
      }
    case GET_FILES: {
      return {
        files: action.payload.files,
        isLoading: false
      }
    }
    default:
      return { ...state, isLoading: false }
  }
}