import {DIAPER_LOAD_DATA} from './index'
import {getUrl} from '../utils/index'

export const getDiaper = (token, currentChild) => {
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
            .then(data => dispatch(getDiaper(token, data.childID)))
            .catch(e => console.log(e))
    }
}
