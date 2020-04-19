import axios from 'axios'
import {GET_CMK, GET_RPD, GET_FEEDBACK} from './types'

export const GetDataAbout = () => dispatch => {

    // debugger
    axios.get('/json/disciplines.json')
        .then(res => {
            // console.log("ACTION", res.data[id]);
            
            dispatch({
                type: GET_RPD,
                payload: {RPDList: res.data}
            })
            return res.data})
        .catch(err => {
            console.error(err);
    })

    axios.get('/json/CMK.json')
        .then(res => {
            // console.log("ACTION", res.data[id]);
            
            dispatch({
                type: GET_CMK,
                payload: {CMKList: res.data}
            })
            return res.data})
        .catch(err => {
            console.error(err);
    })

    axios.get('/json/feedback.json')
        .then(res => {
            // console.log("ACTION", res.data[id]);
            
            dispatch({
                type: GET_FEEDBACK,
                payload: {FeedbackList: res.data}
            })
            return res.data})
        .catch(err => {
            console.error(err);
    })
}