import {
    GET_STAFF_LIST,
    CURRENT_STAFF_LOADING,
    GET_CURRENT_STAFF,
    LOADING_REQ,
    REQ_SUCCESS,
    REQ_FAIL
} from './types';

import axios from 'axios'
import { returnInfo } from './infoActions';

export const GetStaffList = () => dispatch => {

    axios.get('/api/staff')
        .then(res => {
            dispatch({
                type: GET_STAFF_LIST,
                payload: { StaffList: res.data }
            })
            return res.data
        })
        .catch(err => {
            dispatch(returnInfo(err.response.data, err.response.status, 'REQ_FAIL'))
            dispatch({
                type: REQ_FAIL
            })
        })
}

export const GetStaff = (field, value) => dispatch => {

    dispatch({
        type: CURRENT_STAFF_LOADING
    })

    let url = '/get-by-id/'

    if (field !== 'id'){
        url = '/'
    }

    axios.get(`/api/staff${url}${value}`)
        .then(res => {
            dispatch({
                type: GET_CURRENT_STAFF,
                payload: { 
                    CurrentStaff: res.data
                }
            })
            return res.data
        })
        .catch(err => {
            dispatch(returnInfo(err.response.data, err.response.status, 'REQ_FAIL'))
            dispatch({
                type: REQ_FAIL
            })
        })
}

export const postStaff = (Staff) => dispatch => {

    dispatch({
        type: LOADING_REQ
    })

    if (!(Staff.firstname) || !(Staff.lastname)) {
        dispatch(returnInfo("Поля фамилия и имя - обязательные", 400, 'REQ_FAIL'))
        dispatch({
            type: REQ_FAIL
        })
        return
    }

    const config = {
        headers: {
            "Content-type": "application/json",
            "token": localStorage.getItem("token")
        }
    }

    let data = {}

    for (let item in Staff) {
        if (Staff[item].length !== 0) { data[item] = Staff[item] }
    }

    axios.post(`/api/staff`, data, config)
        .then(res => {
            dispatch(returnInfo(res.data, res.status, 'REQ_SUCCESS'))
            dispatch({
                type: REQ_SUCCESS
            })
        })
        .catch(err => {
            dispatch(returnInfo(err.response.data, err.response.status, 'REQ_FAIL'))
            dispatch({
                type: REQ_FAIL
            })
        })
}

export const delStaff = (id) => dispatch => {

    dispatch({
        type: LOADING_REQ
    })

    const config = {
        headers: { "token": localStorage.getItem("token") }
    }

    // debugger
    axios.delete(`/api/staff/${id}`, config)
        .then(res => {
            dispatch(returnInfo(res.data, res.status, 'REQ_SUCCESS'))
            dispatch({
                type: REQ_SUCCESS
            })
        })
        .catch(err => {
            dispatch(returnInfo(err.response.data, err.response.status, 'REQ_FAIL'))
            dispatch({
                type: REQ_FAIL
            })
        })
}

export const patchStaff = (id, Staff) => dispatch => {

    dispatch({
        type: LOADING_REQ
    })

    if (!(Staff.firstname) || !(Staff.lastname)) {
        dispatch(returnInfo({ message: "Поля фамилия и имя - обязательные" }, 400, 'REQ_FAIL'))
        dispatch({
            type: REQ_FAIL
        })
    }

    const config = {
        headers: {
            "Content-type": "application/json",
            "token": localStorage.getItem("token")
        }
    }

    const data = Staff

    // console.log(data);

    // debugger
    axios.patch(`/api/staff/${id}`, data, config)
        .then(res => {
            dispatch(returnInfo(res.data, res.status, 'REQ_SUCCESS'))
            dispatch({
                type: REQ_SUCCESS
            })
        })
        .catch(err => {
            dispatch(returnInfo(err.response.data, err.response.status, 'REQ_FAIL'))
            dispatch({
                type: REQ_FAIL
            })
        })
}