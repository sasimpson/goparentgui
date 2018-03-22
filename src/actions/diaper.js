import {DIAPER_LOAD_DATA, DIAPER_ADD_DATA} from './index'
import {getUrl} from '../utils/index'
import {flashSuccessMessage} from 'redux-flash'


const diaperAddPostData = (data) => {
    return {type: DIAPER_ADD_DATA, payload: data}
}

export const getDiaper = (token) => {
    return (dispatch) => {
        return fetch(getUrl("/api/waste"), {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token
            }
        })
            .then(r => r.json())
            .then(data => dispatch({type: DIAPER_LOAD_DATA, payload: data}))
            .catch(e => console.log(e))
    }
}

export const postDiaper = (token, data) => {
    return (dispatch) => {
        return fetch(getUrl("/api/waste"), {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + token
            },
            body: JSON.stringify({
                wasteData: {
                    wasteType: data.wasteType,
                    timestamp: data.timestamp,
                    childID: data.childID
                }
            })
        })
            .then(r => r.json())
            .then(data => {
                dispatch(diaperAddPostData(data.wasteData))
                dispatch(flashSuccessMessage("diaper record added", {timeout: 500}))
            })
            .catch(e => console.log(e))
    }
}
