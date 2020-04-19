import { 
    GET_RPD,
    GET_FEEDBACK,
    GET_CMK 
} from "../../actions/data_actions/types"

const RPDState = {
    RPDList: []
}

const FeedbackState = {
    FeedbackList: []
}

const CMKState = {
    CMKList: []
}

export function RPDReducer(state=RPDState, action){
    switch (action.type) {
        case GET_RPD:
            return{
                ...state,
                RPDList: action.payload.RPDList
            }
        default:
            return state;
    }
}

export function FeedbackReducer(state=FeedbackState, action){
    switch (action.type) {
        case GET_FEEDBACK:
            return{
                ...state,
                FeedbackList: action.payload.FeedbackList
            }
        default:
            return state;
    }
}

export function CMKReducer(state=CMKState, action){
    switch (action.type) {
        case GET_CMK:
            return{
                ...state,
                CMKList: action.payload.CMKList
            }
        default:
            return state;
    }
}
