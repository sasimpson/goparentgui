import {
    FEEDING_LOAD_DATA,
    FEEDING_LOADING_DATA,
    FEEDING_LOAD_FAILED,
    FEEDING_WILL_POST,
    FEEDING_ADD_DATA
} from './index'

import {getUrl} from '../utils/index'
import {flashSuccessMessage} from 'redux-flash'


const feedingWillPostData = () => {
    return {type: FEEDING_WILL_POST}
}

const feedingAddPostData = (data) => {
    return {type: FEEDING_ADD_DATA, payload: data}
}

const feedingLoadData = (data) => {
    return {type: FEEDING_LOAD_DATA, payload: data}
}

const feedingLoadingInProgress = () => {
    return {type: FEEDING_LOADING_DATA}
}

const feedingLoadDataFailed = () => {
    return {type: FEEDING_LOAD_FAILED}
}

export const getFeedings = (token) => {
    return (dispatch) => {
        dispatch(feedingLoadingInProgress())
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
            .catch(e => {
                dispatch(feedingLoadDataFailed())
                console.log(e)
            })
    }
}

export const postFeeding = (token, data) => {
    return (dispatch) => {
        dispatch(feedingWillPostData())
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
            .then(data => {
                dispatch(feedingAddPostData(data.feedingData))
                dispatch(flashSuccessMessage("feeding record added"))
            })
            .catch(e => console.log(e))
    }
}
