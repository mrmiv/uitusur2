import {
    GET_STUDYPLAN,
    GET_CURATORS,
    GET_CLUBS,
    GET_CLUB
} from '../../actions/data_actions/types'
import { LOADING_REQ } from '../../actions/types'

const StudyPlanState = {
    StudyPlan: {}
}

const CuratorsState = {
    CuratorList: []
}

const ClubsState = {
    ClubsList: [],
    Club: null,
    isLoading: false
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
        case LOADING_REQ:
            return{
                ...state,
                isLoading: true
            }
        case GET_CLUBS:
            return{
                ...state,
                ClubsList: action.payload.ClubsList,
                isLoading: false
            }
        case GET_CLUB:
            return{
                ...state,
                Club: action.payload.Club,
                isLoading: false
            }
        default:
            return {...state, isLoading:false};
    }
}