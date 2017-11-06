import {FEEDING_LOAD_DATA} from './index'

export const getFeedings = (token, currentChild) => {
    console.log("getFeedings: ", currentChild)
    return (dispatch) => {
        fetch("/api/feeding", {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token
            }
        }) 
            .then(r => r.json())
            .then(data => dispatch({type: FEEDING_LOAD_DATA, payload: data}))
            .catch((e) => console.log(e))
    }
}

export const postFeeding = (token, data) => {
    console.log("postFeeding")
    console.log(data)
    return (dispatch) => {
        fetch("/api/feeding?child_id=" + data.childID, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + token
            },
            body: JSON.stringify({
                feedingData: {
                    feedingType: data.feedingType, 
                    timestamp: data.timestamp.toISOString(), 
                    feedingSide: data.feedingSide, 
                    feedingAmount: parseFloat(data.feedingAmount, 10),
                    childID: data.childID
                }
            })
        })
            .then(r => r.json())
            .then(data => dispatch(getFeedings(token, data.childID)))
            .catch((e) => console.log(e))
    }
}
