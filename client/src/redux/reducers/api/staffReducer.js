import {
    GET_STAFF_LIST,
    CURRENT_STAFF_LOADING,
    GET_CURRENT_STAFF
} from '../../actions/types';
import { combineReducers } from 'redux';

const StaffListState = {
    StaffList: []
}

const CurrentStaffState = {
    CurrentStaff: null,
    isLoading: false
}

export default combineReducers({
    StaffList: StaffListReducer,
    CurrentStaff: CurrentStaffReducer
})

function StaffListReducer(state=StaffListState, action){
    switch(action.type){
        case GET_STAFF_LIST:
            // console.log(action.payload.StaffList)
            return{
                ...state,
                StaffList: action.payload.StaffList,
                isLoading: false
            }
        default:
            return state
    }
}

function CurrentStaffReducer(state=CurrentStaffState, action){
    // CURRENT STAFF
    switch(action.type){
        case CURRENT_STAFF_LOADING:
            return{
                ...state,
                isLoading: true
            }
        case GET_CURRENT_STAFF:
            console.log(action.payload.CurrentStaff);
            
            return{
                ...state,
                CurrentStaff: action.payload.CurrentStaff,
                isLoading: false
            }
        default: 
            return state
    }
}