import {
    GET_STUDYPLAN,
    GET_CURATORS,
    GET_CLUBS
} from '../../actions/data_actions/types'

const StudyPlanState = {
    StudyPlan: {}
}

const CuratorsState = {
    CuratorList: []
}

const ClubsState = {
    ClubsList: []
}

export function StudyPlanReducer(state=StudyPlanState, action){
    switch (action.type) {
        case GET_STUDYPLAN:
            return{
                ...state,
                StudyPlan: action.payload.StudyPlan
            }
        default:
            return state;
    }
}

export function CuratorsReducer(state=CuratorsState, action){
    switch (action.type) {
        case GET_CURATORS:
            return{
                ...state,
                CuratorList: action.payload.CuratorList
            }
        default:
            return state;
    }
}

export function ClubsReducer(state=ClubsState, action){
    switch (action.type) {
        case GET_CLUBS:
            return{
                ...state,
                ClubsList: action.payload.ClubsList
            }
        default:
            return state;
    }
}