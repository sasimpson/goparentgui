import {SLEEP_LOAD_DATA} from './index'

export const getSleep = (token) => {
    console.log("getSleep", token)
    return (dispatch) => {
        return fetch("/api/sleep", {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token
            }
        })
            .then(r => r.json())
            .then(data => dispatch({type: SLEEP_LOAD_DATA, payload: data}))
            .catch(e => console.log(e))
    }
}
