import {
    GET_RPD,
    GET_FEEDBACK,
    GET_ONE_FEEDBACK,
    GET_CMK,
    CHANGE_VISIBILITY_BY_ID
} from "../../actions/data_actions/types"
import { LOADING_REQ } from "../../actions/types"

const RPDState = {
    RPDList: []
}

const FeedbackState = {
    FeedbackList: [],
    Feedback: {},
    isLoading: false
}

const CMKState = {
    CMKList: []
}

export function RPDReducer(state = RPDState, action) {
    switch (action.type) {
        case GET_RPD:
            return {
                ...state,
                RPDList: action.payload.RPDList
            }
        default:
            return state;
    }
}

export function FeedbackReducer(state = FeedbackState, action) {
    switch (action.type) {
        case LOADING_REQ:
            return {
                ...state,
                isLoading: true
            }
        case GET_FEEDBACK:
            return {
                ...state,
                FeedbackList: action.payload.FeedbackList,
                isLoading: false
            }
        case GET_ONE_FEEDBACK:
            return {
                ...state,
                Feedback: action.payload.Feedback,
                isLoading: false
            }
        case CHANGE_VISIBILITY_BY_ID:
            return {
                ...state,
                FeedbackList: state.FeedbackList.map( item => {
                    if (item._id === action.payload.id){
                        item.isActive = !item.isActive
                        return item
                    }
                    return item
                })
            }
        default:
            return { ...state, isLoading: false };
    }
}

export function CMKReducer(state = CMKState, action) {
    switch (action.type) {
        case GET_CMK:
            return {
                ...state,
                CMKList: action.payload.CMKList
            }
        default:
            return state;
    }
}
