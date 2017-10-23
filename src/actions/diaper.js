import {DIAPER_LOAD_DATA} from './index'

export const getDiaper = (token) => {
    console.log("getDiaper", token)
    return (dispatch) => {
        return fetch("http://localhost:8000/api/waste", {
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
    console.log("postDiaper")
    return (dispatch) => {
        return fetch("http://localhost:8000/api/waste", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + token
            },
            body: JSON.stringify({
                wasteData: {
                    type: data.wasteType,
                    timestamp: data.timestamp,
                    childID: data.childID
                }
            })
        })
            .then(r => r.json())
            .then(data => dispatch(getDiaper(token)))
            .catch(e => console.log(e));
    }
}
