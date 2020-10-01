import {
    GET_DEGREE
} from '../../actions/data_actions/types'

const DegreeState = {
    DegreeList: []
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