import {GET_STUDYPLAN,
        GET_CURATORS,
        GET_CLUBS
} from './types'

import axios from 'axios'

export const GetDataStudent = () => dispatch => {

    axios.get('/json/curators.json')
        .then(res => {
            // console.log("ACTION", res.data[id]);
            
            dispatch({
                type: GET_CURATORS,
                payload: {CuratorList: res.data}
            })
            return res.data})
        .catch(err => {
            console.error(err);
    })

    axios.get('/json/clubs.json')
        .then(res => {
            // console.log("ACTION", res.data[id]);
            
            dispatch({
                type: GET_CLUBS,
                payload: {ClubsList: res.data}
            })
            return res.data})
        .catch(err => {
            console.error(err);
    })
}

export const GetStudyPlan = (type, year) => dispatch => {
    axios.get('/json/studyPlan.json')
        .then(res => {
            // console.log("ACTION", res.data);
            
            if (type === "m"){
                dispatch({
                    type: GET_STUDYPLAN,
                    payload: {StudyPlan: res.data.m[year-1]}
                })
                return res.data.m[year-1]
            } else if (type === "b"){
                dispatch({
                    type: GET_STUDYPLAN,
                    payload: {StudyPlan: res.data.b[year-1]}
                })
                return res.data.b[year-1]
            }
            return res.data})
        .catch(err => {
            console.error(err)
    })
}