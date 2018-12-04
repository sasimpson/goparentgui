import {
    SLEEP_LOAD_DATA,
    SLEEP_FETCH_DATA,
    SLEEP_ADD_DATA,
    SLEEP_GRAPH_DATA,
    SLEEP_STATUS
} from './index'

import {getUrl} from '../utils/index'
import { flashSuccessMessage } from 'redux-flash/lib/actions';

//action creators
const sleepFetchingData = () => {
    return {type: SLEEP_FETCH_DATA}
}

const sleepLoadData = (data) => {
    return {type: SLEEP_LOAD_DATA, payload: data}
}

const sleepAddPostData = (data) => {
    return {type: SLEEP_ADD_DATA, payload: data}
}

const sleepGraphData = (data) => {
    return {type: SLEEP_GRAPH_DATA, payload: data}
}

const sleepStatus = (data) => {
    return {type: SLEEP_STATUS, payload: data}
}

export const getSleep = (token) => {
    return (dispatch) => {
        dispatch(sleepFetchingData())
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

export const getSleepStatus = (token, childID) => {
    return (dispatch) =>{
        fetch(getUrl("/api/sleep/status/" + childID), {
            method: "GET", 
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                'Authorization': "Bearer " + token
            }
        })
            .then( r => r.status )
            .then( statusCode => {
                if (statusCode === 200) {
                    dispatch(sleepStatus(true))
                } else {
                    dispatch(sleepStatus(false))
                }
            })
            .catch(e => console.log(e))
    }
}

export const setSleepStatus = (token, childID, status) => {
    return (dispatch) => {
        fetch(getUrl("/api/sleep/" + status + "/" + childID), {
            method: "POST", 
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                'Authorization': "Bearer " + token
            }
        })
            .then( r => r.status)
            .then( statusCode => {
                if (statusCode === 200) {
                    if (status === "start") {
                        dispatch(sleepStatus(true))
                    }
                    else {
                        dispatch(sleepStatus(false))
                    }
                }
            })
            .catch(e => console.log(e))
    }
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