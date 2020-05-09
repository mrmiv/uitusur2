import {
    REQ_FAIL,
    REQ_SUCCESS,
    GET_DOCUMENTS_LIST,
    DOC_LOADING,
    GET_DOC,
    LOADING_REQ,
    DOCS_LOADING
} from "../../actions/types"
import { combineReducers } from 'redux';

const DocumentsState = {
    docslist: [],
    categories: [],
    subcategories: [],
    isLoading: false
}

const DocState = {
    document: {},
    isLoading: false
}

function DocumentsReducer(state = DocumentsState, action) {
    switch (action.type) {
        case DOCS_LOADING:
        case LOADING_REQ:
            return {
                ...state,
                isLoading: true
            }
        case REQ_FAIL:
        case REQ_SUCCESS:
            return {
                ...state,
                isLoading: false
            }
        case GET_DOCUMENTS_LIST:
            // console.log(state)
            return {
                ...state,
                docslist: action.payload.docslist,
                categories: action.payload.categories,
                subcategories: action.payload.subcategories,
                isLoading: false
            }
        default:
            return { ...state, isLoading: false }
    }
}

function DocReducer(state = DocState, action) {
    switch (action.type) {
        case DOC_LOADING:
            return {
                ...state,
                isLoading: true
            }
        case GET_DOC:
            return {
                ...state,
                document: action.payload.document,
                isLoading: false
            }
        default:
            return { ...state, isLoading: false }
    }
}

export default combineReducers({
    docslist: DocumentsReducer,
    doc: DocReducer
})