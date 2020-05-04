import axios from 'axios'
import {
    GET_DEGREE,
    GET_QUOTE
} from './types'

export const GetDataHome = () => dispatch => {

    axios.get('/json/degreeCards.json')
        .then(res => {
            // console.log("ACTION", res.data[id]);

            dispatch({
                type: GET_DEGREE,
                payload: { DegreeList: res.data }
            })
            return res.data
        })
        .catch(err => {
            console.error(err);
        })

    axios.get('/json/quotes.json')
        .then(res => {
            // console.log("ACTION", res.data[id]);

            dispatch({
                type: GET_QUOTE,
                payload: { QuoteList: res.data }
            })
            return res.data
        })
        .catch(err => {
            console.error(err);
        })

}

export const GetDegreeList = () => dispatch => {

    axios.get('/json/degreeCards.json')
        .then(res => {
            dispatch({
                type: GET_DEGREE,
                payload: {
                    DegreeList: res.data
                }
            })
            return res.data
        })
        .catch(err => {
            console.error(err);
        })

}