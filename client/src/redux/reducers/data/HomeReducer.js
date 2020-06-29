import {
    GET_DEGREE,
    GET_QUOTE
} from '../../actions/data_actions/types'

const DegreeState = {
    DegreeList: []
}

const QuoteState = {
    QuoteList: []
}

export function QuoteReducer(state=QuoteState, action){
    switch (action.type) {
        case GET_QUOTE:
            return{
                ...state,
                QuoteList: action.payload.QuoteList,
            }
        default:
            return state;
    }
}

export function DegreeReducer(state=DegreeState, action){
    switch (action.type) {
        case GET_DEGREE:
            return{
                ...state,
                DegreeList: action.payload.DegreeList
            }
        default:
            return state;
    }
}