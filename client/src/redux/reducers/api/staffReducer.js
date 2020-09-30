import {
    GET_STAFF_LIST,
    CURRENT_STAFF_LOADING,
    GET_CURRENT_STAFF,
    LOADING_REQ
} from '../../actions/types';
import { combineReducers } from 'redux';

const StaffListState = {
    StaffList: [],
    isLoading: false
}

const CurrentStaffState = {
    CurrentStaff: null,
    isLoading: false,
    LastCurrentStaff: ''
}

export default combineReducers({
    StaffList: StaffListReducer,
    CurrentStaff: CurrentStaffReducer
})

function StaffListReducer(state = StaffListState, action) {
    switch (action.type) {
        case LOADING_REQ:
            return {
                ...state,
                isLoading: true
            }
        case GET_STAFF_LIST:
            // console.log(action.payload.StaffList)
            return {
                ...state,
                StaffList: action.payload.StaffList,
                isLoading: false
            }
        default:
            return { ...state, isLoading: false }
    }
}

function CurrentStaffReducer(state = CurrentStaffState, action) {
    // CURRENT STAFF
    switch (action.type) {
        case CURRENT_STAFF_LOADING:
            return {
                ...state,
                CurrentStaff: null,
                isLoading: true
            }
        case GET_CURRENT_STAFF:
            return {
                ...state,
                CurrentStaff: action.payload.CurrentStaff,
                LastCurrentStaff: action.payload.LastCurrentStaff,
                isLoading: false
            }
        default:
            return { ...state, isLoading: false }
    }
}