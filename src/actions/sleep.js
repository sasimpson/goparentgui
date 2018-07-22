import {
    SLEEP_LOAD_DATA,
    SLEEP_FETCH_DATA,
    SLEEP_ADD_DATA,
    SLEEP_GRAPH_DATA
} from './index'

import {getUrl} from '../utils/index'
import { flashSuccessMessage } from 'redux-flash/lib/actions';

//action creators
const sleepFetchingData = () => {
    console.log("sleepFetchingData")
    return {type: SLEEP_FETCH_DATA}
}

const sleepLoadData = (data) => {
    console.log("sleepLoadData", data)
    return {type: SLEEP_LOAD_DATA, payload: data}
}

const sleepAddPostData = (data) => {
    return {type: SLEEP_ADD_DATA, payload: data}
}

const sleepGraphData = (data) => {
    return {type: SLEEP_GRAPH_DATA, payload: data}
}

export const getSleep = (token) => {
    console.log("getSleep token: ", token)
    return (dispatch) => {
        dispatch(sleepFetchingData)
        return fetch(getUrl("/api/sleep"), {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token
            }
        })
            .then(r => r.json())
            .then(data => dispatch(sleepLoadData(data)))
            .catch(e => console.log(e))
    }
}

export const postSleep = (token, data) => {
    return (dispatch) => {
        fetch(getUrl("/api/sleep"), {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + token
            },
            body: JSON.stringify({
                sleepData: {
                    start: data.startDate, 
                    end: data.endDate,
                    childID: data.childID
                }
            })
        })
            .then(r => r.json())
            .then(data =>{ 
                dispatch(sleepAddPostData(data.sleepData))
                dispatch(flashSuccessMessage("sleep data added!", {timeout: 500}))
            })
            .catch(e => console.log(e))
    }
}

export const getSleepStatus = (token) => {
    fetch(getUrl("/api/sleep/status"), {
        method: "GET", 
        headers: {
            'Authorization': "Bearer " + token
        }
    })
        .then( r => r.status )
        .then( statusCode => {
            if (statusCode === 200) {
                this.setState({ sleepStatus: true })
            } else {
                this.setState({ sleepStatus: false })
            }
        })
        .catch(e => console.log(e))
}

export const getSleepGraphData = (token, id) => {
    return (dispatch) => {
        return fetch(
            getUrl("/api/sleep/graph/" + id), {
                method: "GET",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': "Bearer " + token
                }
            }
        )
            .then(r => r.json())
            .then(data => {
                dispatch(sleepGraphData(data))
            })
            .catch(e => console.log(e))
    }
}