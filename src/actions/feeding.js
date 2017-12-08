import {
    FEEDING_LOAD_DATA, 
    FEEDING_FETCH_DATA, 
    FEEDING_POST_DATA 
} from './index'

import {getUrl} from '../utils/index'

const feedingFetchingData = () => {
    return {type: FEEDING_FETCH_DATA}
}

const feedingPostData = () => {
    return {type: FEEDING_POST_DATA}
}

const feedingLoadData = (data) => {
    return {type: FEEDING_LOAD_DATA, payload: data}
}

export const getFeedings = (token) => {
    return (dispatch) => {
        dispatch(feedingFetchingData())
        fetch(getUrl("/api/feeding"), {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token
            }
        }) 
            .then(r => r.json())
            .then(data => {
                dispatch(feedingLoadData(data))
            })
            .catch((e) => console.log(e))
    }
}

export const postFeeding = (token, data) => {
    return (dispatch) => {
        dispatch(feedingPostData())
        fetch(getUrl("/api/feeding"), {
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
            .then(data =>{ 
                dispatch(getFeedings(token))
            })
            .catch((e) => console.log(e))
    }
}
