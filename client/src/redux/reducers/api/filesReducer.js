import {
  DELETE_FILE,
  GET_FILES,
  LOADING_REQ,
  UPLOAD_FILE
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
    case UPLOAD_FILE: {
      return {
        ...state,
        files: [ action.payload.file, ...state.files ]
      }
    }
    case DELETE_FILE: {
      return {
        ...state,
        files: state.files.filter( file => file._id !== action.payload.id)
      }
    }
    default:
      return { ...state, isLoading: false }
  }
}