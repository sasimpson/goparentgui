import {DIAPER_LOAD_DATA} from './index'
import {getUrl} from '../utils/index'
import {flashSuccessMessage} from 'redux-flash'

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
                dispatch(getDiaper(token, data.childID))
                dispatch(flashSuccessMessage("diaper record added"))
            })
            .catch(e => console.log(e))
    }
}
