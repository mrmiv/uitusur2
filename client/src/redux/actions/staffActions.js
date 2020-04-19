import {
    GET_STAFF_LIST,
    CURRENT_STAFF_LOADING,
    GET_CURRENT_STAFF
} from './types';

import axios from 'axios'

export const GetStaffList = () => dispatch => {

    axios.get('/json/staff.json')
        .then(res => {
            // console.log(res.data)
            dispatch({
            type: GET_STAFF_LIST,
            payload: {StaffList: res.data}
        })
            return res.data})
        .catch(err => {
            console.log(err);
    })
}

export const GetStaff = (id) => dispatch => {

    dispatch({
        type: CURRENT_STAFF_LOADING
    })

    // debugger
    axios.get('/json/staff.json')
        .then(res => {
            // console.log("ACTION", res.data[id]);
            if (!res.data[id]){
                return console.error("Сотрудник с таким id не найден")
            }
            
            dispatch({
                type: GET_CURRENT_STAFF,
                payload: {CurrentStaff: res.data[id]}
            })
            return res.data[id]})
        .catch(err => {
            console.error(err);
    })
}