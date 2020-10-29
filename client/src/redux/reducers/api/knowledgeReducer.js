import {
  LOADING_REQ,
  SET_MARKS,
  KNOWLEDGE_IS_LOADING,
  GET_ALL_KNOWLEDGE,
  GET_KNOWLEDGE_BY_ID,
  DELETE_KNOWLEDGE
} from '../../actions/types'

const KnowledgeState = {
  knowledgeList: {
    podcast: [],
    audiobook: [],
    course: [],
    app: [],
    other: []
  },
  knowledge: {},
  marks: {
    all: true,
    i: true,
    uk: true,
    rt: true
  },
  isLoading: false
}

export default function (state = KnowledgeState, action) {
  switch (action.type) {
    case LOADING_REQ:
    case KNOWLEDGE_IS_LOADING:
      return {
        ...state,
        isLoading: true
      }
    case GET_ALL_KNOWLEDGE:
      return {
        ...state,
        knowledgeList: {
          podcast: action.payload.podcast,
          audiobook: action.payload.audiobook,
          course: action.payload.course,
          app: action.payload.app,
          other: action.payload.other
        },
        isLoading: false
      }
    case DELETE_KNOWLEDGE:
      return {
        ...state,
        knowledgeList: {
          ...state.knowledgeList,
          [action.payload.type]: state.knowledgeList[action.payload.type].filter( item => item._id !== action.payload._id)
        },
        isLoading: false,
      }
    case GET_KNOWLEDGE_BY_ID:
      return {
        ...state, 
        knowledge: action.payload.knowledge,
        isLoading: false,
      }
    case SET_MARKS:
      return {
        ...state,
        marks: action.payload.marks
      }
    default:
      return { ...state, isLoading: false }
  }
}