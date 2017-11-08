import {
    SLEEP_LOAD_DATA,
    SLEEP_FETCH_DATA
} from './index'

//action creators
const sleepFetchingData = () => {
    return {type: SLEEP_FETCH_DATA}
}

const sleepLoadData = (data) => {
    return {type: SLEEP_LOAD_DATA, payload: data}
}


export const getSleep = (token) => {
    console.log("getSleep", token)
    return (dispatch) => {
        dispatch(sleepFetchingData)
        return fetch("/api/sleep", {
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
