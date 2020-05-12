import {
  GET_QUIZ
} from '../../actions/types'
import { LOADING_REQ } from '../../actions/types'

const QuizState = {
  quiz: '',
  isLoading: false
}

export default function (state = QuizState, action) {
  switch (action.type) {
    case LOADING_REQ:
      return {
        ...state,
        isLoading: true
      }
    case GET_QUIZ: {
      return {
        quiz: action.payload.quiz,
        isLoading: false
      }
    }
    default:
      return { ...state, isLoading: false }
  }
}