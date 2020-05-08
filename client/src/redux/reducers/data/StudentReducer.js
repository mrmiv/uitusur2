import {
    GET_COURSE_STUDYPLAN, GET_ONE_STUDYPLAN, GET_STUDYPLAN,
    GET_CURATORS, GET_CURATOR,
    GET_CLUBS, GET_CLUB,
} from '../../actions/data_actions/types'
import { LOADING_REQ } from '../../actions/types'

const StudyPlanState = {
    StudyPlans: [],
    groupSP: {},
    courseSP: [],
    isLoading: false
}

const CuratorsState = {
    CuratorList: [],
    isLoading: false,
    Curator: null
}

const ClubsState = {
    ClubsList: [],
    Club: null,
    isLoading: false
}

export function StudyPlanReducer(state = StudyPlanState, action) {
    switch (action.type) {
        case LOADING_REQ:
            return {
                ...state,
                isLoading: true
            }
        case GET_STUDYPLAN:
            return {
                ...state,
                StudyPlans: action.payload.StudyPlans,
                isLoading: false
            }
        case GET_ONE_STUDYPLAN:
            return {
                ...state,
                groupSP: action.payload.groupSP,
                isLoading: false
            }
        case GET_COURSE_STUDYPLAN:
            return {
                ...state,
                courseSP: state.StudyPlans.filter(sp => sp.course === action.course),
                isLoading: false
            }
        default:
            return { ...state, isLoading: false };
    }
}

export function CuratorsReducer(state = CuratorsState, action) {
    switch (action.type) {
        case LOADING_REQ:
            return {
                ...state,
                isLoading: true
            }
        case GET_CURATORS:
            return {
                ...state,
                CuratorList: action.payload.CuratorList,
                isLoading: false
            }
        case GET_CURATOR:
            return {
                ...state,
                Curator: action.payload.Curator,
                isLoading: false
            }
        default:
            return { ...state, isLoading: false };
    }
}

export function ClubsReducer(state = ClubsState, action) {
    switch (action.type) {
        case LOADING_REQ:
            return {
                ...state,
                isLoading: true
            }
        case GET_CLUBS:
            return {
                ...state,
                ClubsList: action.payload.ClubsList,
                isLoading: false
            }
        case GET_CLUB:
            return {
                ...state,
                Club: action.payload.Club,
                isLoading: false
            }
        default:
            return { ...state, isLoading: false };
    }
}